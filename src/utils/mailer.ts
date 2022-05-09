import nodemailer from "nodemailer"

const createTestCreds = async () => {
    const creds = await nodemailer.createTestAccount()
    console.log(creds)
}

createTestCreds()

export const sendUserVerificationEmail = async () => {

}