"use strict";

console.log('page loads');
// initialize empty riders
// let riders = [];

// let user1_name = riders[0].name;
// let user1_age = riders[0].phone;
// let user2_name = riders[1].name;
// let user2_age = riders[1].phone;

const resetPage = () => {
    $('#resultsample').hide();
    $('#notfound').hide();
    $('#result').html('');
};


$(() => {
    console.log('jquery works!');
    // hide result sample and notfound
    resetPage();
    // handle search form submission
    $('#searchForm').submit((e) => {
        console.log('searchForm submitted. regnum:', $('#regnum').val());
        // prevent normal form submission
        e.preventDefault();
        // reset page
        resetPage();
        // get search expression from form
        let expression = $('#regnum').val();
        // get list of riders from JSON
        $.getJSON('oyo-riders.json', (data) => {
            console.log('getJSON results data:', data);
            // store riders for ease
            let riders = data.riders;
            // assume rider is not found
            let rider = false;
            // loop through riders
            $.each(riders, (key, value) => {
                // if the regno matches the supplied expression...
                if (value.regno.search(expression) !== -1) {
                    console.log('found rider!', value);
                    rider = value;
                    // populate the result with the rider details
                    $('#result').append(
                        `
                        <hr>
                        <!-- rider details -->
                        <h3 class=" text-center my-4">RESULT</h3>
                        <div class="border border-dark px-4 py-4">
                            <img class="mx-auto d-block" src="images/riders/${rider.riderPhoto}">
                            <table class="table table-bordered table-hover mt-4">
                                <tbody>
                                  <tr>
                                    <td>Motorcycle Reg No</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.regno}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Brand</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.brand}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Owner</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.name}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.phone}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>Address</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.address}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>BVN</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.bvn}</strong></td>
                                  </tr>
                                  <tr>
                                    <td>NIN</td>
                                    <td class="font-weight-bold text-success"><strong>${rider.nin}</strong></td>
                                  </tr>
                                </tbody>
                              </table>
                        </div>
                        `
                    )
                    // check if the nextdue date is still in the future
                    // first get the current time and reset the hours
                    let now = new Date();
                    now.setHours(0,0,0,0);
                    // then create a new date using the nextdue property of rider
                    const nextdue = new Date(rider.nextdue);
                    if(now < nextdue) {
                        // registration is still valid
                        console.log('registration is still valid');
                        // append valid alert block
                        $('#result').append(
                            `<div class="alert alert-success text-center mt-4 px-5 py-5" role="alert">
                            <h4 class="alert-heading mb-2">ACTIVE REGISTRATION</h4>
                            <p>This motor cycle registration is due for renewal on:</p>
                            <p class="font-weight-bold text-dark lead my-4">${moment(nextdue).format('LL')}</p>
                            <hr>
                            <p>Thank you for updating your documents on schedule.</p>
                          </div>`
                        );
                    } else {
                        // registration has expired
                        console.log('registration has expired');
                        // append expired alert block
                        $('#result').append(
                            `<div class="alert alert-danger text-center mt-4 px-5 py-5" role="alert">
                            <h4 class="alert-heading mb-2">EXPIRED REGISTRATION</h4>
                            <p>This motor cycle registration was due for renewal on:</p>
                            <p class="font-weight-bold text-dark lead my-4">${moment(nextdue).format('LL')}</p>
                            <hr>
                            <p>Kindly update your documents to avoid embarrassment.</p>
                          </div>`
                        );
                    }
                    // $('#result').append('<li class ="riders" >' + value.name + ' </li>');
                }
            });
            // loop has finished running and rider still not found
            if(!rider) {
                console.log('rider not found!');
                // show notfound
                $('#notfound').show();
            }
        });
    });

});