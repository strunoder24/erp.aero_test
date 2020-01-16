import { mount } from "@vue/test-utils";
import Component from './index'


describe('only default behavior without external handlers', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('./config', () => ({}));
    });
    
    it('renders default component', async() => {
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component);
    
        expect(wrapper.vm.hasExternalHandlers).toBe(false);
        expect(wrapper.find('.arithmetic-symbol').text()).toBe('+');
        
        wrapper.vm.input1 = 10;
        wrapper.vm.input2 = 10;
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('.result').text()).toBe('20')
    });
    
    it('enter key handler is working', async() => {
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component);
        
        wrapper.vm.input1 = 10;
        wrapper.vm.input2 = 10;
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.find('.result').text()).toBe('20');
    });
    
    it('calls alert on severe errors', async() => {
        window.alert = jest.fn();
        
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component, {
            attachToDocument: true
        });
    
        wrapper.vm.input1 = 10;
        wrapper.vm.input2 = '';
        wrapper.find('input').trigger('keydown.enter');
        expect(window.alert).toBeCalledWith('Пожалуйста, укажите оба числа');
        
        wrapper.destroy();
    })
});


describe('external handlers enabled', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('./config', () => ({
            modes: [
                {
                    enable: true,
                    operationName: 'Посчитать сумму',
                    operationSymbol: '+',
                
                    calculateResult (){
                        if (this.validator()) this.result = parseInt(this.input1) + parseInt(this.input2)
                    },
                
                    validator(){
                        const firstNumber = this.input1.toString();
                        const secondNumber = this.input2.toString();
                    
                        if (firstNumber.length === 0 || secondNumber.length === 0) {
                            alert('Пожалуйста, укажите оба числа');
                            return false
                        }
                    
                        this.error = '';
                        return true
                    },
                },
            
                {
                    enable: true,
                    operationName: 'Посчитать разность',
                    operationSymbol: '-',
                
                    calculateResult (){
                        if (this.validator()) this.result = parseInt(this.input1) - parseInt(this.input2)
                    },
                
                    validator(){
                        const firstNumber = this.input1.toString();
                        const secondNumber = this.input2.toString();
                    
                        if (firstNumber.length === 0 || secondNumber.length === 0) {
                            alert('Пожалуйста, укажите оба числа');
                            return false
                        }
                    
                        this.error = '';
                        return true
                    },
                },
            
                {
                    enable: true,
                    operationName: 'Посчитать произведение',
                    operationSymbol: '*',
                
                    calculateResult (){
                        if (this.validator()) this.result = parseInt(this.input1) * parseInt(this.input2)
                    },
                
                    validator(){
                        const firstNumber = this.input1.toString();
                        const secondNumber = this.input2.toString();
                    
                        if (firstNumber.length === 0 || secondNumber.length === 0) {
                            alert('Пожалуйста, укажите оба числа');
                            return false
                        }
                    
                        else if (firstNumber === '0' || secondNumber === '0') {
                            this.error = 'Умножение любого числа на ноль, всегда равно нолю';
                            return true
                        }
                    
                        else if (firstNumber === '1' || secondNumber === '1') {
                            this.error = 'При умножении любого числа на единицу результат будет равен этому числу';
                            return true
                        }
                    
                        this.error = '';
                        return true
                    },
                },
            
                {
                    enable: true,
                    operationName: 'Посчитать частное',
                    operationSymbol: '/',
                
                    calculateResult (){
                        if (this.validator()) this.result = parseInt(this.input1) / parseInt(this.input2)
                    },
                
                    validator(){
                        const firstNumber = this.input1.toString();
                        const secondNumber = this.input2.toString();
                    
                        if (firstNumber.length === 0 || secondNumber.length === 0) {
                            alert('Пожалуйста, укажите оба числа');
                            return false
                        }
                    
                        else if (firstNumber === '0' && secondNumber !== '0') {
                            this.error = 'Деление ноля на любое число, всегда равно нолю';
                            return true
                        }
                    
                        else if (secondNumber === '0') {
                            alert('На ноль делить нельзя');
                            return false
                        }
                    
                        this.error = '';
                        return true
                    },
                },
            ]
        }));
    });

    it('renders component with all 4 external handlers', async() => {
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component);

        expect(wrapper.vm.buttons.length).toBe(4);
        
        wrapper.vm.input1 = 100;
        wrapper.vm.input2 = 10;
        await wrapper.findAll('button').at(1).trigger('click');
        expect(wrapper.find('.arithmetic-symbol').text()).toBe('-');
        expect(wrapper.find('.result').text()).toBe('90');
    });
    
    it('attention messages works as intended', async()=> {
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component);
    
        await wrapper.findAll('button').at(2).trigger('click');
        expect(wrapper.find('.arithmetic-symbol').text()).toBe('*');
        expect(wrapper.find('.error').text()).toBe('Умножение любого числа на ноль, всегда равно нолю');
    
        // next I'm checking if its actually disabling message
        wrapper.vm.input1 = 100;
        wrapper.vm.input2 = 10;
        await wrapper.findAll('button').at(2).trigger('click');
        expect(wrapper.find('.error').exists()).toBe(false);
    });
    
    it('multiplication handlers works as intended', async() => {
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component);
    
        wrapper.vm.input1 = 100;
        wrapper.vm.input2 = 10;
        await wrapper.findAll('button').at(2).trigger('click');
        expect(wrapper.find('.result').text()).toBe('1 000');
    
        wrapper.vm.input1 = 100;
        wrapper.vm.input2 = 1;
        await wrapper.findAll('button').at(2).trigger('click');
        expect(wrapper.find('.result').text()).toBe('100');
        expect(wrapper.find('.error').text()).toBe('При умножении любого числа на единицу результат будет равен этому числу');
    });
    
    it('division handlers works as intended', async() => {
        window.alert = jest.fn();
        const Component = require('./index.vue').default;
        let wrapper = await mount(Component, {attachToDocument: true});
    
        wrapper.vm.input1 = 100;
        wrapper.vm.input2 = 0;
        await wrapper.findAll('button').at(3).trigger('click');
        expect(window.alert).toBeCalledWith('На ноль делить нельзя');
    
        wrapper.vm.input1 = 0;
        wrapper.vm.input2 = 100;
        await wrapper.findAll('button').at(3).trigger('click');
        expect(wrapper.find('.error').text()).toBe('Деление ноля на любое число, всегда равно нолю');
    
        wrapper.vm.input1 = 1000;
        wrapper.vm.input2 = 100;
        await wrapper.findAll('button').at(3).trigger('click');
        expect(wrapper.find('.arithmetic-symbol').text()).toBe('/');
        expect(wrapper.find('.result').text()).toBe('10');
        
        wrapper.destroy();
    })
});