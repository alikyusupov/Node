
const express = require('express');

const router = express.Router();

const Contact = require("../models/Contacts")

const User  = require("../models/User")
/*НЕУДАЧНАЯ ПОПЫТКА РЕАЛИЗАЦИИ 
router.post("/signup", (req, res, next)=>{
    bcrypt.hash(req.body.password, 12)
    .then(hashedPassword => {
        const user = new User({
            firstname: req.body.firstname,
            password: hashedPassword,
        })
      return user.save();
    })
    .then(()=>{
        res.json({isAuth:true})
    })
    .catch(err=>{
      console.log(err)
    })
})*/

router.post("/delete", (req, res, next)=>{
  let receivedIds = req.body.data;
  Contact.find()
  .then(contacts=>{
    contacts.forEach(contact=>{
      receivedIds.forEach(id=>{
        if(contact._id.toString() === id.toString())
          Contact.findByIdAndRemove(contact._id, (err, data)=>{
            if(err){
              console.log(err)
            }else{
              console.log("Удаление завершено")
            }
          })
      })
    })
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/contacts", (req, res, next)=>{
  Contact.find()
  .then(contacts=>{
    res.json({contacts})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post("/create", (req, res, next)=>{
  let contact = req.body.contact;
    let item = new Contact({
      name:     contact.name,
      age:      contact.age,
      phone:    contact.phone,
      status:   contact.status,
      address:  contact.address,
      avaPath:  contact.avaPath,
      description: contact.description
    })
    item.save()
    .then(()=>{
      Contact.find()
      .then(data=>{
        res.json({contacts:data})
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
})

router.post("/updateName", (req, res, next)=>{
  Contact.findOneAndUpdate({_id:req.body.id}, {name:req.body.name},{new:true})
  .then(()=>{
      res.json({message:"Обновлено"})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post("/updatePhone", (req, res, next)=>{
  Contact.findOneAndUpdate({_id:req.body.id}, {phone:req.body.phone},{new:true})
  .then(()=>{
      res.json({message:"Обновлено"})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post("/updateAddress", (req, res, next)=>{
  Contact.findOneAndUpdate({_id:req.body.id}, {address:req.body.address},{new:true})
  .then(()=>{
      res.json({message:"Обновлено"})
  })
  .catch(err=>{
    console.log(err)
  })
})


module.exports = router;