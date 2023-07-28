const client = require("./databasepg.js");
const express = require("express");

const app = express();

app.listen(8000, () => {
  console.log("SERVER IS LISTENING AT PORT 8000 !!");
});

client.connect();

app.get("/CustomerDetails", (req, res) => {
  client.query(`SELECT * FROM user_table`, (err, result) => {
    if (!err) {
      // console.log(result.rows);
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

app.get("/destn", (req, res) => {
  client.query(`SELECT * FROM destination_table`, (err1, answer) => {
    if (!err1) {
      // console.log(answer.rows);
      res.send(answer.rows);
    } else {
      console.log(err1.message);
    }
  });
});

app.get("/reviews", (req, res) => {
  client.query(
    `select count(reviews) as r_count,destination_name,round((avg(rating))/2),image_url from destination_table 
    full outer join review_table on destination_table.destination_id=review_table.destination_id 
    group by destination_table.destination_id
    order by round;
    
  `,
    (err, result) => {
      if (!err) {
        //   console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
});

//destination explainatopn from destination page
app.get("/destn/:id", (req, res) => {
  const id = req.params.id;
  client.query(
    `select destination_name,destination_id,image_url,description from destination_table
    where destination_table.destination_id=${id};`,
    (err1, answer) => {
      if (!err1) {
        // console.log(answer.rows);
        // console.log("id", id);
        res.json(answer.rows);
      } else {
        console.log(err1.message);
      }
    }
  );
});

//reviews of a particular destination from destinations page
app.get("/review/:id", (req, res) => {
  const id = req.params.id;
  //console.log("isdddd", id);
  client.query(
    `select reviews,rating ,destination_table.destination_name from  destination_table inner join review_table 
    on destination_table.destination_id = review_table.destination_id and destination_table.destination_id=${id};`,
    (err1, answer) => {
      if (!err1) {
        // console.log(answer.rows);
        // console.log("id", id);
        res.json(answer.rows);
      } else {
        console.log(err1.message);
      }
    }
  );
});

//reviews given by a person from customerdetails page
app.get("/reviews/:id", (req, res) => {
  const id = req.params.id;
  //console.log("id", id);
  client.query(
    `select reviews,rating,review_table.destination_id,destination_name from user_table inner join review_table 
    on user_table.user_id = review_table.user_id 
    inner join destination_table 
    on review_table.destination_id = destination_table.destination_id
    where user_table.user_id ='${id}';`,
    (err1, answer) => {
      if (!err1) {
        // console.log(answer.rows);
        res.json(answer.rows);
      } else {
        console.log(err1.message);
      }
    }
  );
});

//places visited  by specific person from customerdetails page
app.get("/destination/:id", (req, res) => {
  const id = req.params.id;
  // console.log("id", id);
  client.query(
    `select destination_name,description,image_url from destination_table inner join user_table
    on destination_table.user_id = user_table.user_id 
    and user_table.user_id='${id}';`,
    (err1, answer) => {
      if (!err1) {
        //console.log(answer.rows);
        res.json(answer.rows);
      } else {
        console.log(err1.message);
      }
    }
  );
});

//To sort reviews based on rating in reviews page

app.get("/sorted_reviews", (req, res) => {
  client.query(
    `select reviews,rating,name,destination_table.destination_name,image_url from review_table inner join destination_table
    on destination_table.destination_id = review_table.destination_id 
    inner join user_table 
    on user_table.user_id = review_table.user_id
    order by rating DESC;`,
    (err, result) => {
      if (!err) {
        console.log(result.rows);
        console.log("hiiii");
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
});

app.get("/sort_users", (req, res) => {
  client.query(
    `select count(reviews) as review_count, name ,mobile, user_table.user_id from user_table 
  inner join review_table on user_table.user_id = review_table.user_id group by 
  user_table.user_id order by review_count DESC;`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        // console.log("HIIIII");
        // console.log("ressssulll", result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
});

app.get("/sort_places", (req, res) => {
  client.query(
    `select count(user_table.user_id) as user_count, mobile,name,user_table.user_id from user_table 
    inner join destination_table
    on user_table.user_id = destination_table.user_id group by 
    user_table.user_id
    order by user_count DESC;`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        // console.log("HIIIII");
        console.log("ressssulllssss", result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
});

//localhost:8000/users?sort=???
//app.get("/users")
//labels instead of values
// single API
