export default {
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
            operationName: 'Посчитать разность',
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
}