const $cupcakesList = $('.cupcakes-list');

function generateCupcake(cupcake) {
    return `
    <div class="col-sm-4 mb-4">
        <div class="card" data-id=${cupcake.id}>
            <img src="${cupcake.image}" class="card-img-top" alt="${cupcake.flavor} ${cupcake.size}">
            <div class="card-body">
                <h5 class="card-title">${cupcake.flavor} ${cupcake.size}</h5>
                <p class="card-text">Rating: ${cupcake.rating}/10</p>
                <a class="delete-cupcake btn btn-danger">X</a>
            </div>
        </div>
    </div>`;
}

async function showCupcakes() {}

function getCupcakes() {
    axios
        .get('/api/cupcakes')
        .then((response) => {
            console.log(response.data);
            // Iterate through each cupcake in the response data
            response.data.cupcakes.forEach((cupcake) => {
                let newCupcake = generateCupcake(cupcake);
                // Append the new cupcake to the cupcakes list
                $cupcakesList.append(newCupcake);
            });
        })
        .catch((error) => {
            // Handle error
            console.log(error);
        });
}

$('#new-cupcake-form').on('submit', async function (evt) {
    evt.preventDefault();

    let flavor = $('#flavor');
    let size = $('#size');
    let rating = $('#rating');
    let image = $('#image');

    console.log({
        flavor: flavor.val(),
        size: size.val(),
        rating: rating.val(),
        image: image.val(),
    });

    const newCupcakeResponse = await axios.post('/api/cupcakes', {
        flavor: flavor.val(),
        size: size.val(),
        rating: rating.val(),
        image: image.val(),
    });

    let newCupcake = $(generateCupcake(newCupcakeResponse.data.cupcake));
    $cupcakesList.append(newCupcake);
    $('#new-cupcake-form').trigger('reset');
});

$cupcakesList.on('click', '.delete-cupcake', async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).parent().parent();
    //console.log($cupcake);
    let cupcakeId = $cupcake.attr('data-id');
    //console.log(cupcakeId);
    await axios.delete(`api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

window.onload = getCupcakes;
