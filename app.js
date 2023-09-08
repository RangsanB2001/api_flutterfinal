var express = require("express");

var bodyParser = require("body-parser");

var app = express();

const db = require("./db.js");

// เข้ารหัสส่งข้อมูล

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// start server

// แสดงผล
app.get("/", function (req, res) {
  res.send("Hello Restful database API");
});
app.get("/testdb", function (req, res) {
  res.send("Want");
});

// ดึงข้อมูล db
// เรียกข้อมูลใน db มาแสดง
app.get("/orderall", function (req, res) {
  // ติดต่อ db
  let sql =
    "SELECT `order_no`, `product_name`, `product_source`, `order_num`, `cust_id` FROM `dborder`";
  db.query(sql, (err, results, fields) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: "ไม่สามารถแสดงข้อมูลได้ :" + err.sqlMessage,
      });
    } else {
      let results1 = { Data: results };
      res.json(results1);
    }
  });
});

// ส่งค่าไปเพิ่อเพิ่มข้อมูลใน ฐานข้อมูล
app.post("/insertorder", function (req, res) {
  // รับค่าผ่าน form post
  let data = {
    cust_id: req.body.cust_id,
    product_name: req.body.product_name,
    product_source: req.body.product_source,
    order_num: req.body.order_num,
  };

  // บันทึกข้อมูลลง db
  let sql = "INSERT INTO dborder SET ?";
  db.query(sql, data, (err, results, fields) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: "ไม่สามารถเพิ่มข้อมูลได้ :" + err.sqlMessage,
      });
    } else {
      let result = {
        status: 200,
        message: "เพิ่มข้อมูลเรียบร้อย",
      };
      res.json(result);
    }
  });
});

// ส่งค่าไปเพิ่อแก้ไขข้อมูลใน ฐานข้อมูล

app.put("/updateorder", function (req, res) {
  // รับค่าผ่าน form post

  let data = {
    cust_id: req.body.cust_id,
    product_name: req.body.product_name,
    product_source: req.body.product_source,
    order_num: req.body.order_num,
  };

  let orderno = req.body.order_no;
  let custid = req.body.cust_id;

  // แก้ไขข้อมูลลง db

  let sql = "UPDATE dborder SET ? WHERE order_no=? and cust_id=?";

  db.query(sql, [data, orderno, custid], (err, results, fields) => {
    if (err) {
      res.status(500).json({
        status: 500,

        message: "ไม่สามารถแก้ไขข้อมูลได้ :" + err.sqlMessage,
      });
    } else {
      let result = {
        status: 200,

        message: "แก้ไขข้อมูลเรียบร้อย",
      };

      res.json(result);
    }
  });
});

//select where

app.get('/orderwhere',function(req,res){
    // รับค่าผ่าน form get
    console.log(req.query.cust_id)
    let cust_id = req.query.cust_id
    // ติดต่อ db
    let sql = 'SELECT order_no,product_name,order_num FROM dborder WHERE cust_id=?'
    db.query(sql, cust_id, (err, results, fields) => {
        if (err) {
            res.status(500).json({
                'status': 500,
                'message': 'ไม่พบข้อมูล :' + err.sqlMessage
            });
        } else {
        let rs= {'Data': results};
        res.json(rs);
        }
    })
})

app.get('/orderwheretwo',function(req,res){
    // รับค่าผ่าน form get
    console.log(req.query.cust_id)
    let cust_id = req.query.cust_id
    // ติดต่อ db
    let sql = 'SELECT order_no,product_name,order_num FROM dborder WHERE cust_id=?'
    db.query(sql, cust_id, (err, results, fields) => {
        if (err) {
            res.status(500).json({
                'status': 500,
                'message': 'ไม่พบข้อมูล :' + err.sqlMessage
            });
        } else {
        // let rs= {'Data': results};
        res.json(results);
        }
    })
})
app.listen(3000, () => {
  console.log("Server running port 3000");
});
