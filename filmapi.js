$.ajax({
	url: "https://www.omdbapi.com/?s=warkop&apikey=d753517c",
	success: (result) => {
		const movies = result.Search;
		const el = movies
			.map(
				f => `
			<div class="col-md-4 mb-3">
			<div class="card">
			<img src="${f.Poster}" class="card-img-top" alt="...">
			<div class="card-body">
			  <h5 class="card-title">${f.Title}</h5>
			  <p class="card-text">${f.Year}</p>

			  <a href="#" class="btn btn-primary tampil-detail" data-bs-toggle="modal"
			  data-bs-target="#exampleModal" data-imdid=${f.imdbID}>Show detail</a>
			</div>
		  </div>
			</div>
			`
			)
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
						url: `http://www.omdbapi.com/?i=${$(this).data('imdid')}&apikey=d753517c`,
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
				});
			} else {
				const el = `<h5 style="text-align:center;" class="text-danger">Film tidak ada</h5>`;
				$(".daftar-film").html(el);
			}
		},
	});
});
