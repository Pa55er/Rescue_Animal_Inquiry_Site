import express from "express";
let app = express();

const port = 5500;

app.use(express.static("public")); //public이라는 폴더 사용을 선언함

app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});

app.get("/", function (req, res) {
    res.sendfile("public/index.html");
});
