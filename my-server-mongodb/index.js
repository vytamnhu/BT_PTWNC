const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const path = require("path");
const fs = require('fs');
app.use(express.static(path.join(__dirname, "public")));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

let database;
let fashionCollection;

// Kết nối MongoDB
client.connect().then(() => {
    database = client.db("FashionData");
    fashionCollection = database.collection("Fashion");
    console.log("Đã kết nối thành công tới MongoDB Database: FashionData");
});

// Hàm hỗ trợ tạo Slug chuẩn SEO tiếng Việt
function createSlug(str, idF) {
    if (!str) return `fashion-${idF}`;
    str = str.toLowerCase()
        .normalize('NFD')                     // Tách dấu ra khỏi chữ cái
        .replace(/[\u0300-\u036f]/g, '')     // Xóa dấu
        .replace(/[đĐ]/g, 'd')               // Chuyển đ thành d
        .replace(/[^a-z0-9 -]/g, '')         // Xóa ký tự đặc biệt
        .replace(/\s+/g, '-')                // Thay khoảng trắng bằng dấu -
        .replace(/-+/g, '-');                // Xóa dấu - trùng lặp
    return idF ? `${str}-${idF}` : str;
}

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

// 1. API cập nhật tự động Slug + IdF cho tất cả dữ liệu cũ chưa có trong CSDL
app.get("/update-slugs", cors(), async (req, res) => {
    try {
        const fashions = await fashionCollection.find({}).toArray();
        let count = 0;

        for (let i = 0; i < fashions.length; i++) {
            const item = fashions[i];
            const idF = item.IdF || (i + 1);
            const slug = createSlug(item.fashion_subject, idF);

            await fashionCollection.updateOne(
                { _id: item._id },
                { $set: { IdF: idF, slug: slug } }
            );
            count++;
        }

        res.send({ message: `Đã cập nhật thành công IdF và Slug cho ${count} sản phẩm!` });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// 2. GET tất cả sản phẩm
app.get("/fashions", cors(), async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
});

// 3. GET chi tiết sản phẩm theo Slug (Truy xuất SEO)
app.get("/fashions/slug/:slug", cors(), async (req, res) => {
    try {
        const slugParam = req.params.slug;
        const result = await fashionCollection.findOne({ slug: slugParam });
        if (!result) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm!" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 4. GET chi tiết theo ID (Mongo ObjectId)
app.get("/fashions/:id", cors(), async (req, res) => {
    try {
        var o_id = new ObjectId(req.params["id"]);
        const result = await fashionCollection.find({ _id: o_id }).toArray();
        res.send(result[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// 5. POST thêm sản phẩm mới (Tự động phát sinh IdF và slug)
app.post("/fashions", cors(), async (req, res) => {
    try {
        const newFashion = req.body;
        newFashion.IdF = Date.now(); 
        newFashion.slug = createSlug(newFashion.fashion_subject, newFashion.IdF);
        
        await fashionCollection.insertOne(newFashion);
        res.send(newFashion);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// 6. PUT cập nhật sản phẩm
app.put("/fashions", cors(), async (req, res) => {
    try {
        var o_id = new ObjectId(req.body._id);
        const updatedSlug = createSlug(req.body.fashion_subject, req.body.IdF);

        await fashionCollection.updateOne(
            { _id: o_id },
            {
                $set: {
                    style: req.body.style,
                    fashion_subject: req.body.fashion_subject,
                    fashion_detail: req.body.fashion_detail,
                    fashion_image: req.body.fashion_image,
                    slug: updatedSlug
                }
            }
        );
        const result = await fashionCollection.find({ _id: o_id }).toArray();
        res.send(result[0]);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// 7. DELETE xóa sản phẩm
app.delete("/fashions/:id", cors(), async (req, res) => {
    try {
        var o_id = new ObjectId(req.params["id"]);
        const result = await fashionCollection.find({ _id: o_id }).toArray();
        await fashionCollection.deleteOne({ _id: o_id });
        res.send(result[0]);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});