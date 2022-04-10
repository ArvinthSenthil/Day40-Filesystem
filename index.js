var express = require("express");
var fs = require("fs");
var path = require("path");

const app = express();
const PORT = 4000;

app.use(express.json());

//Create a text file in particular folder:
app.get("/create-file", (req, res) => {
  try {
    //Directory
    

    //Timestamp
    const currentTimeStamp = new Date();
    const month = currentTimeStamp.getMonth();
    const date = currentTimeStamp.getDate();
    const year = currentTimeStamp.getFullYear();
    const hours = currentTimeStamp.getHours();
    const minutes = currentTimeStamp.getMinutes();
    const seconds = currentTimeStamp.getSeconds();

    const currentDate = `${date}-${month + 1}-${year}`;
    const currentTime = `${hours}hrs${minutes}mts${seconds}sec`;
    const filename = `${currentDate}_${currentTime}.txt`;

    //Create txt file
    fs.writeFile(
      `./TestFolder/${filename}`,
      `${currentTimeStamp}`,
      "utf8",
      () => res.send(`${filename} file created in  folder.`)
    );
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

//Retrieve all text file in that particular folder
app.get("/get-file", (req, res) => {
  try {
    //Directory
    const directory = "E:/TestFolder";
    //Read files in the directory with file type
    fs.readdir(
      directory,
      { encoding: "utf8", withFileTypes: true },
      (err, files) => {
        if (err) {
          res.send(err);
        } else {
          const textfiles = files
            .filter((file) => {
              return path.extname(file.name) === ".txt";
            })
            .map((data) => {
              return {
                filename: data.name,
                extension: path.extname(data.name),
              };
            });
          res.send(textfiles);
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

//Listening in particular port
app.listen(PORT, () => console.log(`app listening in port ${PORT}`));