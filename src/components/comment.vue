<template lang="pug">
//- Edit comment
.edit-comment(v-if="showEditForm")
  textarea.edit-comment__textarea.input.input--textarea#edit-comment(v-model="inputText" rows='1')
  .edit-comment__buttons.button-group
    .button(v-bind:class="buttonClass" v-on:click.stop ="save") Сохранить
    .button.button--cancel(v-on:click.stop="closeEditForm") Отмена

//- Show comment
.comment(v-else)
  .comment__body {{comment.text}}
  .comment__footer
    .comment__avatar
      svg(viewbox='0 0 24 24' height='10' width='10' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio="none")
        //- Scale from 24 to 10, 0.42 = 10 / 24
        g(transform="scale(0.42)")
          path(d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z')
          path(d='M0 0h24v24H0z', fill='none')
    .comment__user {{comment.user}}
    //- Format date with moment.js
    .comment__timestamp &nbsp;{{comment.timestamp | moment("DD MMMM")}}

    .comment__dropdown(v-click-outside="clickOutside")
      .comment__arrow(v-on:click="callDropdown")
        svg.comment__svg(height='100%', viewbox='0 0 24 24', width='100%', xmlns='http://www.w3.org/2000/svg')
          g(transform="scale(0.42)")
            path(d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z')
            path(d='M0-.75h24v24H0z', fill='none')
      //- Edit/Delete dropdown
      .dropdown(v-if="showDropdown")
        .dropdown__item(v-on:click.stop="edit") Редактировать
        .dropdown__item(v-on:click.stop="remove") Удалить
      //- Delete confirm dropdown
      .dropdown(v-if="deleteConfirm")
        .dropdown__item.dropdown__item--bold Удаление&nbsp;комментария
        .dropdown__buttons
          .button-group
            .button.button--alert(v-on:click="removeComment") Удалить
            .button.button--cancel(v-on:click="closeDropdowns") Отмена
</template>

<script>
// Autosize for textarea
import autosize from 'autosize'

// Mixins
import Common from './mixins/common.js'

export default {
  mixins: [Common],
  props: ['comment'],
  data (){
    return {
      showDropdown: false, // Edit/remove dropdown
      deleteConfirm: false, // Confirm delete dropdown
      showEditForm: false, // Show edit form or comment
      textarea: false, // Var for store textarea element
      inputText: '' // Model for text input
    }
  },
  methods: {
    // Show/hide dropdown by clicking on arrow icon
    callDropdown (){
      this.showDropdown = !this.showDropdown
    },
    // Just close all dropdowns
    closeDropdowns(){
      this.showDropdown = false
      this.deleteConfirm = false
    },
    // Close dropdown by clicking somewhere outside arrow icon and dropdown
    clickOutside (){
      this.closeDropdowns()
    },

    /***
    Edit comment section
    ***/
    // Switch to editing form
    edit (){
      this.closeDropdowns()
      this.inputText = this.comment.text
      this.showEditForm = true
      this.$nextTick(function(){
        this.textarea = document.querySelector('#edit-comment')
        autosize(this.textarea)
        this.textarea.focus()
      })
    },
    // Save form and emit edit event
    save (){
      this.$emit('edit',this.comment, this.inputText)
      this.closeEditForm()
    },
    // Reset and close form
    closeEditForm (){
      autosize.destroy(this.textarea)
      this.showEditForm = false
    },

    /***
    Delete section
    ***/
    // Call confirm remove dialog
    remove(){
      this.showDropdown = false
      this.deleteConfirm = true
    },
    // Finally remove comment from confirm remove dialog by emiting event
    removeComment (){
      this.closeDropdowns()
      this.$emit('remove',this.comment)
    },
  },
}
</script>

<style lang="css">
</style>
