const express = require('express')
const jwt = require('jsonwebtoken')
const jwtkey = 'pizzaWeb'
require('./ConfigureData/config')
const Model = require ('./ConfigureData/Model')
const Message = require('./Feedback/Model')
const Contacts = require ('./Contacts/Model')
const Products = require('./Products/Model')
const Carts = require('./Carts/Model')
const Items = require ('./CartItems/Model')
const Catering = require('./Catering/Model')
const { sendmail } = require('./SendMail/emailController'); 

const cors = require('cors');
const app = express()
// postman se jo data arha usko handle krne keliye
app.use(express.json())
app.use(cors()); 

app.post('/register',async(req,res)=>{

     const existingEmail= await Model.findOne({email: req.body.email})
     const existingPhone= await Model.findOne({phone: req.body.phone})
     if(existingEmail){
        return res.status(400).send({message: 'Email Already Registered'})
     }
     if(existingPhone){
        return res.status(404).send({message: 'Phone Number Already Registered'})
     }
     let data = new Model({ ...req.body, role: req.body.role || 'user' }); 
    let result = await data.save();
    jwt.sign({result}, jwtkey, {expiresIn: "2h"}, (err,  token)=>{
        if(err){
             res.send({result : 'Something went wrong'})
        }
        res.send({result , auth : token})
    })
})
app.post('/login', async (req, res) => {  
  try {
      if (req.body.password && req.body.email) {
          let result = await Model.findOne(req.body);
          
          if (result) {
              await Model.updateOne({ _id: result._id }, { isOnline: true });
              jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                  if (err) {
                      return res.send({ result: 'Something went wrong' });
                  }
                  res.send({ result, auth: token });
              });
          } else {
              return res.status(404).send({ result: 'User not found' });
          }
      } else {
          return res.status(400).send({ result: 'No User Found' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).send({ result: 'Internal Server Error' });
  }
});
app.put('/logout',verifyToken, async (req, res) => {
  const userId = req.body.userId;
  console.log(userId) 

  if (!userId) {
    return res.status(400).send({ result: 'User ID is required' });
  }

  try {
    await Model.updateOne({ _id: userId }, { isOnline: false });
    res.send({ result: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).send({ result: 'Internal Server Error' });
  }
});



app.post('/feedback',async(req,res)=>{
    let data = new Message(req.body)
    let result = await data.save()
    res.send(result)
})
app.get ('/customerFeedback', async(req,res)=>{
  let data = await Message.find({})
  res.send(data)
})
app.post('/contactUs',async(req,res)=>{
    let data = new Contacts(req.body)
    let result = await data.save()
    res.send(result)
})
app.post('/products', async(req,res)=>{
    let result= await Products.insertMany(req.body)
    res.send(result)
})
app.get('/card-items',async(req,res)=>{
    let result = await Products.find()
    res.send(result)
})
app.post('/cartForm', async(req,res)=>{
    let data = await Carts(req.body)
    let result = await data.save();
    res.send(result)
 })
 app.post('/cartItems', verifyToken, async (req, res) => {
    try {
      const items = req.body; 
      const savedItems = await Promise.all(
        items.map(async (item) => {
          const newItem = new Items(item); 
          const savedItem = await newItem.save(); 
          return savedItem; 
        })
      );
      // Send the saved items array as a response
      res.json(savedItems);
    } catch (error) {
      console.error('Error saving items:', error);
      res.status(500).send('Error saving items');
    }
  });

  app.post('/mail', sendmail); 

  app.post('/catering',async(req,res)=>{
    let data= new Catering(req.body)
    let result = await data.save();
    res.send(result)
  })


  app.get('/users', async(req,res)=>{
    let result = await Model.find({})
    res.send(result)
  })
  app.get('/ourProducts', async(req,res)=>{
    let result = await Products.find({})
    res.send(result)
  })
  
  app.get('/ordered', async(req,res)=>{
    let result = await Items.find({})
    res.send (result)
    
  })
  app.delete('/deleteProduct/:id', verifyAdmin, async (req, res) => {
    try {
      const result = await Products.deleteOne({ _id: req.params.id });
      
      if (result.deletedCount === 1) {
        res.status(200).send({ message: 'Product deleted successfully' });
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting product', error });
    }
  });
  function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(" ")[1]
        req.token = token
        jwt.verify(token, jwtkey, (err, authData) => {
          if (err) {
              if (err.name === 'TokenExpiredError') {
                  return res.status(401).send({ result: 'Token Expired' });
              } else {
                  return res.status(403).send({ result: 'Invalid or Modified Token' });
              }
          }
          req.authData = authData;
          next();
      });
      

    }
    else{
        res.send({result : 'Token Not Found'})
    }
  }
  function verifyAdmin(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(" ")[1];

        // Verify token and check role
        jwt.verify(token, jwtkey, (err, authData) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                if (authData.result.role === 'admin') {
                    next();
                } else {
                    res.status(403).send({ result: 'Access Denied: Admins Only' });
                }
            }
        });
    } else {
        res.status(403).send({ result: 'Token Not Found' });
    }
}

   

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
});