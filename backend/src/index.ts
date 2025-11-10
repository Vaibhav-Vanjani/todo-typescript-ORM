import {deleteData,insertData,updateData} from './dbUtils/dbUtils';
import express from 'express';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',function(req,res,next){
    res.status(200).json({
        success:true,
        data:"WORKINGGG",
    })
})

app.post('/insert',async function(req,res) {
    try {
        const {id,title} = req.body;
       await insertData(id,title);
        
        return res.status(200).json({
            success:true,
            data:req.body,
            message:"YAYYY successfully inserted data",
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            data:req.body,
            message:"Something went wrong inside insertData"+error,
        })
    }
})

app.post('/update',async function(req,res) {
    try {
        const {id,title} = req.body;
        await updateData(id,title);
        
        return res.status(200).json({
            success:true,
            data:req.body,
            message:"YAYYY successfully updated data",
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            data:req.body,
            message:"Something went wrong inside updateData"+error,
        })
    }
})

app.post('/delete',async function(req,res) {
    try {
        const {id} = req.body;
        await deleteData(id);
        
        return res.status(200).json({
            success:true,
            data:req.body,
            message:"YAYYY successfully deleted data",
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            data:req.body,
            message:"Something went wrong inside deleted data"+error,
        })
    }
})


app.listen(3000,"0.0.0.0");

