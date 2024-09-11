<template>
  <div class="container mt-3">
    <h1 class="mb-4">Books</h1>
    <div class="mb-3">
      <!-- Search for ISBN -->
      <label for="searchISBN" class="form-label">Search by ISBN</label>
      <input type="text" v-model="searchIsbn" class="form-control mb-2" id="searchISBN" />

      <!-- Search for Name -->
      <label for="searchName" class="form-label">Search By Name</label>
      <input type="text" v-model="searchName" class="form-control mb-2" id="searchName" />

      <!-- Limit Query Results -->
      <label for="limitQuery" class="form-label">Limit Results</label>
      <select v-model="limitQuery" class="form-select mb-2" id="limitQuery">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>

      <!-- Order by Select -->
      <label for="orderByField" class="form-label">Order By</label>
      <select v-model="orderByField" class="form-select mb-2" id="orderByField">
        <option value="isbn">ISBN</option>
        <option value="name">Name</option>
      </select>

      <!-- Button to Fetch Books -->
      <button @click="fetchBooks" class="btn btn-primary mb-4 mt-4">Fetch Books</button>
    </div>

    <!-- Table for Books -->
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.name }}</td>
          <td>{{ book.isbn }}</td>
          <td>
            <!-- Action Buttons -->
            <button class="btn btn-sm btn-warning me-2" @click="$emit('editBook', book)">
              Modify
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  deleteDoc,
  doc
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const searchIsbn = ref('')
    const searchName = ref('')
    const orderByField = ref('name')
    const limitQuery = ref(10)

    const fetchBooks = async () => {
      try {
        const q = buildQuery()
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    const buildQuery = () => {
      let q = query(collection(db, 'books'), orderBy(orderByField.value), limit(limitQuery.value))

      if (searchIsbn.value) {
        q = query(q, where('isbn', '==', Number(searchIsbn.value)))
      }

      if (searchName.value) {
        q = query(
          q,
          where('name', '>=', searchName.value),
          where('name', '<=', searchName.value)
        )
      }

      return q
    }

    const deleteBook = async (bookId) => {
      try {
        const bookRef = doc(db, 'books', bookId)
        await deleteDoc(bookRef)
        alert(`Book with ID: ${bookId} deleted successfully`)
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book: ', error)
        alert('Error deleting book')
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      searchIsbn,
      searchName,
      orderByField,
      limitQuery,
      fetchBooks,
      deleteBook    
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
