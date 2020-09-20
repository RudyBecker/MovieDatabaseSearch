import {ref, toRefs, reactive} from '@vue/composition-api';
import useFetch from './use-fetch';
export default function() {
  let movies = reactive({list: [], error: null, fetching: false});
  const val = ref('');
  const submitted = async () => {

    const {response, error, fetchData, fetching} = useFetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d1da20fbfa65312b857fb7b517bf855c&language=en-US&query=${val.value}&page=1&include_adult=false`,
      {}
    );
    fetchData();
    movies.list = response;
    movies.error = error;
    movies.fetching = fetching;
    console.log(response)
  };
  return {submitted, ...toRefs(movies), val};
}
