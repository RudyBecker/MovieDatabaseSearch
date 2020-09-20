<template>
  <div class="movies">
    <h1>Search Your Favorite Movies</h1>
    <section>
      <form @submit.prevent="submitted">
        <input v-model="val" type="text" />
        <button>Submit</button>
      </form>
    </section>
    <div v-if="error">
      <h2>erorr!! {{ error }}</h2>
    </div>
    <div v-if="fetching">
      <h2>Finding Movies...</h2>
    </div>
    <h3>My Collection of Movies</h3>
    <div v-for="(movie, n) in movies" :key="`movie-${n}`">
      <p>
        <span class="movie">{{movie}}</span>
        <button @click="removeMovie(n)">Remove</button>
      </p>
    </div>
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
          <span class="bold clamp">{{ movie.overview }}</span>
        </li>
      </ul>
    </div>
    <span class="title">Total Search Results:</span>
    <span class="bold">{{ list.total_results }}</span>
  </div>
</template>

<script>
import useMovieList from "../composition/use-movie-list";

import { createComponent } from "@vue/composition-api";
export default createComponent({
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
    if (localStorage.getItem("movies")) {
      try {
        this.movies = JSON.parse(localStorage.getItem("movies"));
      } catch (e) {
        localStorage.removeItem("movies");
      }
    }
  },
  methods: {
    addCollection(movie) {
      this.movies.push(movie);
    },
    removeMovie(x) {
      this.movies.splice(x, 1);
      this.saveMovies();
    },
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
  width: 600px;
  text-align: left;
}
.movies {
  max-width: 1024px;
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
</style>
