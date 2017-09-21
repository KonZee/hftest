var Common = {
  computed: {
    buttonClass (){
      // NOTE Не ок дизейблить кнопку только при нулевом вводе, но без уточнения от UX делаем так
      return this.inputText.length > 0 ? 'active' : 'disabled'
    },
  },
}

module.exports = Common
