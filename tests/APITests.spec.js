import { expect, test } from "@playwright/test";

var userid; 

test("Get users", async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2')
  console.log(await response.json())
  expect(response.status()).toBe(200)
})


test.only("Create user", async ({ request }) => {

  const response = await request.post('https://reqres.in/api/users',
    {
      data: { "name": "Yilmaz", "job": "trainer" },
      headers: { "Accept": "application/json" }
    }
  );

  console.log(await response.json());
  expect(response.status()).toBe(201);

  var res = await response.json();
  userid = res.id;

});



test("Update user", async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/' + userid,
    {
      data: { "name": "Mehmet", "job": "engineer" },
      headers: { "Accept": "application/json" }
    }
  );

  console.log(await response.json());
  expect(response.status()).toBe(200);
});


test("Delete user", async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/' + userid);
  expect(response.status()).toBe(204);
});

// Create
/*
test.skip("Create user2", async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}`, {
        data: {
            "name": "xyz}",
            "gender": "male",
            "email": "xyzabc245faas@gmail.com",
            "status": "inactive"
        }, headers: {
            "Accept": "application/json"
        }
    });
    expect(_response.status()).toBe(201);
    expect(_response.ok()).toBeTruthy();
    console.log(await _response.json());
    const res = await _response.json();
    _number = res.result.task_effective_number;
    _sys_id = res.result.sys_id;

    // output as xml
    // console.log((await _response.body()).toString());
})
// test("", async ({ page }) => {
//     await page.request.get("")
// })
*/
