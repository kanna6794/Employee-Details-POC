
function sendMailToEmp(data) {
    // var email = data.email;
    // var transporter2 = nodemailer.createTransport({
    //     host: 'smtp.hostinger.in',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'bala10decoders@gmail.com',
    //         pass: 'Abc@12345'
    //     }
    // })

    // mailOptions = {
    //     from: 'bala10decoders@gmail.com',
    //     to: email,
    //     subject: "Employee Acknowledgement",
    //     html: '<h2>Your details are added successfully</h2>'
    // }

    // transporter2.sendMail(mailOptions, function (err, info) {
    //     if (err)
    //         console.log(err);
    //     else
    //         console.log(info);
    // });

    return 'success'
}

router.post('/createuser', function (req, res, next) {
    var data = req.body;
    console.log("body---->>", req.body)
    usercreate(data).then(host => {
        return res.status(200).json({
            message: "success",
            statuscode: "200",
        });

    })
        .catch(err => {
            console.log("Error_Promised_Occured")
            console.error(err);
        });

});

function usercreate(data){
    return new Promise(async (resolve, reject) => {
        try {
            var email = data.email;
            var name = data.name;
            var gender = data.gender;
            var contact = data.contact;
            var profile_img = data.profile_img;
            var resume_doc = data.resume_doc;
            var insuser = await userdata(data);

// send email
    var transporter2 = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'bala10decoders@gmail.com',
            pass: 'Abc@12345'
        }
    })

    mailOptions = {
        from: 'bala10decoders@gmail.com',
        to: email,
        subject: "Employee Acknowledgement",
        html: '<h2>Your details are added successfully. We will contact soon</h2>'
    }

    transporter2.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });

            resolve('success')
           
        } catch (error) {
            return reject(error);
        }
    });
 
}

async function userdata(data) {
    const createinsrt = await user.create(data);
    return createinsrt;
  }