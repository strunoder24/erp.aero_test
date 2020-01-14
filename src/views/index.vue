<template>
    <div class='container'>
        <input v-model='input1'
               @input='calculateResult()'
               min='0'
               type='number'>
        <span class='arithmetic-symbol'>{{ operationSymbol }}</span>
        <input v-model='input2'
               @input='calculateResult()'
               min='0'
               type='number'>
        <span class='arithmetic-symbol'>=</span>
        <span class='result'>{{ getResult(result) }}</span>
        <div class='error' v-if='error'>{{ error }}</div>
    </div>
</template>

<script>
    import config from '~/config';
    import { divideByThousands } from '~a/helpers'
    
    export default {
        data: () => ({
            input1: 0,
            input2: 0,
            operationSymbol: '+',
            result: 0,
            error: ''
        }),
        mounted() {
        
        },
        computed: {},
        methods: {
            calculateResult(){
                if (this.validate()) this.result = parseInt(this.input1) + parseInt(this.input2)
            },
            
            validate(){
                if (this.input1.toString().length && this.input2.toString().length) {
                    this.error = '';
                    return true
                } else {
                    this.error = 'please set both numbers';
                    return false
                }
            },
    
            getResult(){
                return divideByThousands(this.result)
            }
        },
        components: {}
    }
</script>

<style lang='scss' scoped>
    .arithmetic-symbol {
        margin: 0 10px
    }
    
    
    input {
        width: 60px
    }
    
    
    .error {
        color: red
    }
</style>