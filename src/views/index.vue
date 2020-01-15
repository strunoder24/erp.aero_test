<template>
    <div class='container'>
        <input v-model='input1'
               min='0'
               @click='focusInput($event)'
               @keydown.enter='enterKeyHandler()'
               type='number'>
        <span class='arithmetic-symbol'>{{ operationSymbol }}</span>
        <input v-model='input2'
               min='0'
               @click='focusInput($event)'
               @keydown.enter='enterKeyHandler()'
               type='number'>
        <span class='arithmetic-symbol'>=</span>
        <span class='result'>{{ getResult(result) }}</span>
        <div class='error' v-if='error'>{{ error }}</div>
        <div class='buttons-container'>
            <button v-for='button in buttons'
                    @click='handleButtonPress(button)'
            >
                {{ button.operationName }}
            </button>
        </div>
    </div>
</template>

<script>
    import config from './config';
    import { divideByThousands } from '~a/helpers'
    
    export default {
        data: () => ({
            input1: 0,
            input2: 0,
            result: 0,
            error: '',
    
            operationSymbol: '+',
            buttons: [
                {
                    operationSymbol: '+',
                    operationName: 'Посчитать сумму',
                }
            ],
            hasExternalHandlers: false
        }),
        
        mounted() {
            this.init();
        },
        
        methods: {
            // Расчётная функция по умолчанию
            calculateResult(){
                if (this.validator()) this.result = parseInt(this.input1) + parseInt(this.input2)
            },
            
            // Валидатор по умолчанию
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
            
            // Обработка нажатия на кнопку "посчитать"
            handleButtonPress(button) {
                if (this.hasExternalHandlers) {
                    // если имеется хотя бы один внешний хэндлер, то находим его по символу операции
                    let handler = config.modes.find(el => {
                        return el.operationSymbol === button.operationSymbol;
                    });
    
                    // Перезаписываем обработчики в компоненте
                    this.calculateResult = handler.calculateResult;
                    this.validator = handler.validator;
                    this.operationSymbol = handler.operationSymbol;
                    
                    this.calculateResult();
                    
                } else {
                    // Если нет активных внешних хэндлеров
                    this.calculateResult();
                }
            },
            
            // Проверка есть ли активные хэндлеры во внешнем файле
            hasAnyActiveHandlers(){
                return config.modes.some((el) => {
                    return el.enable
                })
            },
    
            // Функция для клавиши enter. С её помощью можно с клавиатуры запускать расчёт не кликая по кнопке.
            // при этом отрабатывает функция которая была использованна в последний раз
            enterKeyHandler(){
                if (this.hasExternalHandlers) this.handleButtonPress(this.buttons.find(el => {
                    return el.operationSymbol === this.operationSymbol;
                }));
                else this.calculateResult()
            },
    
            // Вспомогательная функция для лучшего UX
            getResult(){
                if (typeof this.result === 'number') return divideByThousands(this.result);
                else return this.result;
            },
    
            // Вспомогательная функция для лучшего UX
            focusInput(e) {
                e.toElement.select();
            },
            
            // Функция проверяет наличие внешнего файла с обработчиками
            init() {
                if (config && config.modes && this.hasAnyActiveHandlers()) {
                    this.hasExternalHandlers = true;
                    this.buttons = config.modes.filter(el => {
                        return el.enable
                    });
                    this.operationSymbol = this.buttons[0].operationSymbol;
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    .arithmetic-symbol {
        display: inline-block;
        width: 10px;
        margin: 0 10px;
        text-align: center;
    }
    
    
    input {
        width: 60px;
        border-radius: 5px;
    }
    
    button {
        background-color: transparent;
        border: 1px solid dodgerblue;
        border-radius: 5px;
        font-size: 20px;
    }
    
    
    .result {
        font-weight: bold;
    }
    
    
    .error {
        color: red;
        font-weight: bold;
    }
    
    
    .buttons-container {
        padding: 20px 0
    }
    
    button {
        display: block;
        transition: color linear .2s, background-color linear .2s;
        cursor: pointer;
        
        &:not(:last-child) {
            margin-bottom: 10px;
        }
        
        &:hover {
            color: #fff;
            background-color: dodgerblue;
        }
    }
</style>