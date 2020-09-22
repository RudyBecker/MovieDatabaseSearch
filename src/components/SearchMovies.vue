<template>
  <div>
    <div class="collection">
      <h3>My Collection of Movies</h3>
      <!-- For loop to display movie title in movies array -->
      <div v-for="(movie, n) in movies" :key="`movie-${n}`">
        <p>
          <span class="movie">{{movie}}</span>
          <button @click="removeMovie(n)">Remove</button>
        </p>
      </div>
    </div>
    <div class="movies">
      <h1>Search Your Favorite Movies</h1>
      <!--Search bar to search movie database by title -->
      <form @submit.prevent="submitted">
        <input v-model="val" type="text" />
        <button>Submit</button>
      </form>
      <!-- Display to user if error in search -->
      <div v-if="error">
        <h2>erorr!! {{ error }}</h2>
      </div>
      <!-- Display to inform user that application is processing the request -->
      <div v-if="fetching">
        <h2>Finding Movies...</h2>
      </div>
      <!-- Dynamically render search results with requested data -->
      <div class="search-results" v-for="movie in list.results" :key="movie.id">
        <ul>
          <li>
            <span class="title">Movie Title:</span>
            <span class="bold">{{ movie.title }}</span>
            <button class="add-button" @click="addCollection(movie.title)">Add To Collection</button>
          </li>
          <li>
            <span class="title">Release Date:</span>
            <span class="bold">{{ movie.release_date }}</span>
          </li>
          <li>
            <span class="title">Overview:</span>
            <!-- clamp class used to only display 3 lines of overview to improve user experience and design -->
            <span class="bold clamp">{{ movie.overview }}</span>
          </li>
        </ul>
      </div>
      <!-- Display of total search results matching value searched -->
      <span class="title">Total Search Results:</span>
      <span class="bold">{{ list.total_results }}</span>
    </div>
  </div>
</template>

<script>
import useMovieList from "../composition/use-movie-list";

import { createComponent } from "@vue/composition-api";
export default createComponent({
  //setup for use of Vue Composition API
  setup() {
    const { submitted, list, val, error, fetching } = useMovieList();
    return {
      val,
      list,
      submitted,
      error,
      fetching
    };
  },

  data: function() {
    return {
      movies: [],
      val: null
    };
  },

  mounted() {
    //logic for local storage of selected movie titles
    if (localStorage.getItem("movies")) {
      try {
        this.movies = JSON.parse(localStorage.getItem("movies"));
      } catch (e) {
        localStorage.removeItem("movies");
      }
    }
  },
  methods: {
    // Adds movie title to collection
    addCollection(movie) {
      this.movies.push(movie);
      this.saveMovies();
    },
    //Removes movie title from collection
    removeMovie(x) {
      this.movies.splice(x, 1);
      this.saveMovies();
    },
    //Saves movie titles to local storage (cookies) on computer
    saveMovies() {
      let parsed = JSON.stringify(this.movies);
      localStorage.setItem("movies", parsed);
    }
  }
});
</script>

<style scoped>
.search-results {
  display: flex;
  width: 700px;
  text-align: left;
}
.movies {
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
}
ul {
  list-style-type: none;
  width: 100%;
}
li {
  display: flex;
  justify-content: space-between;
}
.bold {
  font-weight: bold;
}
.movie {
  width: 100px;
  display: inline-block;
}

.clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.collection {
  height: 500px;
  width: 300px;
  position: fixed;
  padding: 2em;
  left: 10%;
  top: 0%;
  transform: translateX(-50%);
  overflow-y: auto;
}
</style>
