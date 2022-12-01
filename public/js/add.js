const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

// Send POST Request to add store into database
async function addStore(e) {
  e.preventDefault();

  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill in the fields!");
    return;
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value,
  };

  try {
    const res = await fetch("/api/v1/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
      return;
    }

    alert("Store Added Sccessfully");

    window.location.href = "/index.html";
  } catch (error) {
    alert(error);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
