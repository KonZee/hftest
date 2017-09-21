<template lang="pug">
  .container
    .comments
      .comments__header
        .comments__header-left
          .comments__title Подумать
          //- Не хватает контекста для правильного именования классов, считаем, что это подзаголовок
          .comments__subtitle Продавец
        .comments__header-right
          .button-group
            .button.button--brand Сменить этап подбора
      .comments__form
        textarea.comments__textarea.input.input--textarea#post-comment(rows=1 placeholder="Написать комментарий" v-on:focus="focus" v-model='inputText')
        //- Slide down transition for form buttons
        transition(name="slide-down")
          .button-group(v-if="showFormButtons")
            .comments__button.button(v-bind:class="buttonClass" v-on:click.stop ="submit") Сохранить
            .comments__button.button.button--cancel(v-on:click.stop="clearForm") Отмена
      .comments__container(v-if="comments.length")
        //- Comment list. Each pass events for edit and delete to this component
        Comment(v-for="comment, index in comments" v-bind:comment='comment' v-bind:key='index' @edit="editChild" @remove="removeChild")
</template>

<script>
// Add some beauty with Autosize for textarea
import autosize from 'autosize'

// Components
import Comment from './comment.vue'

export default {
  data (){
    return {
      showFormButtons: false, // Form buttons
      inputText: '', // Model for text input
      comments: [], // Stored comments
      textarea: false, // Var for store textarea element
    }
  },
  mounted (){
    // Add autosize to textarea
    this.textarea = document.querySelector('#post-comment')
    autosize(this.textarea)
  },
  methods: {
    // Show form buttons by focus on the textarea
    focus (){
      this.showFormButtons = true
    },
    // Submit comment
    submit (){
      // Prevent post empty comments
      if (!this.inputText.length){
        return
      }
      // Create comment object
      var comment = {
        id: this.comments.length ? this.comments[0].id + 1 : 0, //NOTE для отладки генерим id здесь, считая от первого итема в массиве
        user: 'Пантелеймон Христорождественский', // Самое длинное ИФ для тестов (на самом деле мало, может быть еще и отчество)
        text: this.inputText,
        timestamp: new Date()
      }
      this.comments.unshift(comment)
      this.clearForm()
    },
    // Clear form content and hide buttons
    clearForm (){
      this.showFormButtons = false
      this.inputText = ''
      // Reset textarea height to initial position
      this.$nextTick(function(){
        autosize.update(this.textarea)
      })
    },
    // Event handler for comment editing
    editChild (editComment, text){
      this.comments.forEach((comment) => {
        if (comment.id === editComment.id){
          comment.text = text
        }
      })
    },
    // Event handler for comment removal
    removeChild (deleteComment){
      this.comments = this.comments.filter((comment) => deleteComment.id != comment.id)
    },
  },
  computed: {
    buttonClass (){
      // NOTE Не ок дизейблить кнопку только при нулевом вводе, но без уточнения от UX делаем так
      return this.inputText.length > 0 ? 'active' : 'disabled'
    },
  },
  components: {
    Comment,
  },
}
</script>

<style lang="sass">
</style>
