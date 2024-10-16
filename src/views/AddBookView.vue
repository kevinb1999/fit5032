<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">{{ isEditing ? 'Edit Book' : 'Add Book' }}</h1>
        <form @submit.prevent="isEditing ? saveBook() : addBook()">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label class="form-label" for="isbn">ISBN:</label>
              <input class="form-control" type="text" v-model="isbn" id="isbn" required />
            </div>
            <div class="col-md-6 col-sm-6">
              <label class="form-label" for="name">Name:</label>
              <input class="form-control" type="text" v-model="name" id="name" required />
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-primary btn-block mt-4" type="submit">
              {{ isEditing ? 'Save Book' : 'Add Book' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <BookList @editBook="editBook" />
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase/init.js'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

import BookList from '../components/BookList.vue'

export default {
  components: {
    BookList
  },
  setup() {
    const isbn = ref('')
    const name = ref('')
    const isEditing = ref(false)
    const selectedBookId = ref(null)

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    const editBook = (book) => {
      isbn.value = book.isbn
      name.value = book.name
      selectedBookId.value = book.id // Set the book id for editing
      isEditing.value = true
    }

    // Function to save changes to the book
    const saveBook = async () => {
      try {
        if (!selectedBookId.value) return

        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        const bookRef = doc(db, 'books', selectedBookId.value)
        await updateDoc(bookRef, {
          isbn: isbnNumber,
          name: name.value
        })

        isbn.value = ''
        name.value = ''
        selectedBookId.value = null
        isEditing.value = false
        alert('Book updated successfully!')
        isEditing.value = false
      } catch (error) {
        console.error('Error saving book: ', error)
      }
    }

    return {
      isbn,
      name,
      isEditing,
      addBook,
      saveBook,
      editBook
    }
  }
}
</script>
