const cari = document.querySelector("#cari");

// Fitur Perncarian
cari.addEventListener('click', function () {
	const inputcari = document.querySelector("#carifilm").value;
	fetch(`http://www.omdbapi.com/?s=${inputcari}&apikey=d753517c`)
		.then(response => response.json())
		.then(response => {
			const movies = response.Search;
			const daftarfilm = document.querySelector(".daftar-film");
			let cards = '';
			movies.forEach(m => cards += showCard(m));
			daftarfilm.innerHTML = cards;

			// Fitur tampil detail
			const tombolDetail = document.querySelectorAll(".tampil-detail");
			// Tampil Detail
			tombolDetail.forEach(btn => {
				btn.addEventListener('click', function () {
					const id = this.getAttribute('data-imdid');
					fetch(`http://www.omdbapi.com/?i=${id}&apikey=d753517c`)
						.then(response => response.json())
						.then(response => {
							const judul = document.querySelector('.modal-title');
							const containerdetail = document.querySelector('.detail');
							const detail = tampilDetail(response);
							const gambar = document.querySelector('.gambar img');

<<<<<<< HEAD
							// simpan hasil ke dalam modal
							gambar.setAttribute('src', response.Poster);
							judul.textContent = response.Title;
							containerdetail.innerHTML = detail;
						});
=======
					const detail = [Year, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Type]

					//ganti gambar dan judul
					$(".modal-title").html(Title);
					$(".gambar img").attr("src", Poster);

					const propname = ['Year', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Plot', 'Language', 'Country', 'Type']

					const daftar = detail.map((t, i) => `
					<li class="list-group-item"> <b>${propname[i]}</b> : ${t ? t : 'none'}</li>`);
					// console.log(daftar);
					$(".detail").html(daftar);
				}
			})
		});
	},
});

$("#cari").on("click", function () {
	const cari = $("#carifilm").val();
	$.ajax({
		url: `https://www.omdbapi.com/?s=${cari}&apikey=d753517c`,
		success: (result) => {
			const movies = result.Search;
			if (movies) {
				const el = movies
					.map(
						(f) => `
						<div class="col-md-4 mb-3">
							<div class="card">
							<img src="${f.Poster}" class="card-img-top rounded-2" alt="...">
							<div class="card-body">
							<h5 class="card-title">${f.Title}</h5>
							<p class="card-text">${f.Year}</p>

							<a href="#" class="btn btn-primary tampil-detail" data-bs-toggle="modal"
							data-bs-target="#exampleModal" data-imdid=${f.imdbID}>Show detail</a>
							</div>
						</div>
							</div>
						`	)
					.join("");
				$(".daftar-film").html(el);
				$(".tampil-detail").on("click", function () {
					$.ajax({
						url: `https://www.omdbapi.com/?i=${$(this).data('imdid')}&apikey=d753517c`,
						success: result => {

							const {
								Title,
								Year,
								Released,
								Runtime,
								Genre,
								Director,
								Writer,
								Actors,
								Plot,
								Language,
								Country,
								Poster,
								Type } = result;

							const detail = [Year, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Type]

							//ganti gambar dan judul
							$(".modal-title").html(Title);
							$(".gambar img").attr("src", Poster);

							const propname = ['Year', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Plot', 'Language', 'Country', 'Type']

							const daftar = detail.map((t, i) => `
							<li class="list-group-item"> <b>${propname[i]}</b> : ${t ? t : 'none'}</li>`);
							$(".detail").html(daftar);
						}
					})
>>>>>>> 42de4682dd406c97bd8b689ba1e3785494928102
				});
			});
		})
});


function showCard(f) {
	return `<div class="col-md-4 mb-3">
				<div class="card">
				<img src="${f.Poster}" class="card-img-top rounded-2" alt="..." />
				<div class="card-body">
					<h5 class="card-title">${f.Title}</h5>
					<p class="card-text">${f.Year}</p>
					<a
					href="#"
					class="btn btn-primary tampil-detail"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
					data-imdid="${f.imdbID}"
					>Show detail</a
					>
				</div>
				</div>
			</div>`
}
function tampilDetail(result) {
	const {
		Year,
		Released,
		Runtime,
		Genre,
		Director,
		Writer,
		Actors,
		Plot,
		Language,
		Country,
		Type } = result;

	const detail = [Year, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Type]
	const propname = ['Year', 'Released', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Plot', 'Language', 'Country', 'Type']
	const daftar = detail.map((t, i) => `
							<li class="list-group-item"> <b>${propname[i]}</b> : ${t ? t : 'none'}</li>`).join('');
	return daftar;
}