function sendMail(contactForm) {
    emailjs.send("gmail", "memorygame", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "reason_contact": contactForm.subject.value
    })
        .then(
            function (response) {
                alert('Your email has been sent to Paulo Albuquerque', response)

            },
            function (error) {
                alert('Please check your information in the boxes', error);
            }); return false
}