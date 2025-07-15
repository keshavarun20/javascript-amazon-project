const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/images/apple.jpg");
xhr.send(); //async code means it send the request like setInterval/SetTimeOut does not wait for response then runs next line
