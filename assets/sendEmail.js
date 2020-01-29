function sendMail(contactForm){
    emailjs.send("gmail", "memorygame", {
    "from_name": contactForm.name.value, 
    "from_email": contactForm.email.value,
    "reason_contact": contactForm.subject.value
    })
    .then(
        function(response){
            console.log("Sucess", response);
        },
        function(error){
            console.log("failed", error)
        })
}