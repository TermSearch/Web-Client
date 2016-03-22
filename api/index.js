// import friends from './friends';
// import response from './response';

// mock api search
export default function search(query) {
	// console.log(response.results.dictentries);
	// const results = friends.filter(friend => {
	//   let keep = false;
	//
	//   Object.keys(friend).forEach(key => {
	//     const val = friend[key].toString();
	//
	//     if (val.toLowerCase().includes(query.toLowerCase())) {
	//       keep = true;
	//     }
	//   });
	//
	//   return keep;
	// });

	// setting a more realistic (random) timeout
	// return new Promise((resolve) => {
	//   setTimeout(() => resolve(response.results.dictentries), Math.ceil(Math.random() * 250));
	// });
  console.log(query);
  
	return fetch(`http://localhost:2020/api/dictentries/startsWith?term=${query}&limit=10&skip=0&subjectFieldStr=Recht`,
    { method: 'get' })
  .then(res => res.json())
  .then(json => json.results.dictentries);
}
