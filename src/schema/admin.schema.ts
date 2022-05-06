import { getModelForClass, index, pre, prop } from "@typegoose/typegoose"
import bcrypt from "bcrypt"
import { IsEmail } from "class-validator"
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"

enum AdminRole {
    MASTER = "master",
    ADMIN = "admin",
    NORMAL = "normal"
}

registerEnumType(AdminRole, { name: "AdminRole", description: "Enum For Type of Admin Roles i.e. Master, Admin & Normal" })

@pre<Admin>("save", async function () {
    // check if password is being modified
    if (!this.isModified('password')) {
        return
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(this.password, salt)

    this.password = hash
})

@index({ email: 1 })
@ObjectType()
export class Admin {
    @Field(() => ID)
    _id: string

    @Field(() => String, { nullable: false })
    @prop({ required: true, trim: true })
    name: string

    @Field(() => String, { nullable: false })
    @prop({ required: true, unique: true, trim: true })
    email: string

    @prop({ required: true, trim: true })
    password: string

    @Field(() => AdminRole, { nullable: false })
    @prop({ required: true })
    type: AdminRole
}

export const AdminModel = getModelForClass(Admin, { schemaOptions: { timestamps: true } })

@InputType()
export class AdminRegisterInput {
    @Field(() => String, { nullable: false })
    name: string

    @IsEmail()
    @Field(() => String, { nullable: false })
    email: string

    @Field(() => String, { nullable: false })
    password: string

    @Field(() => AdminRole)
    type: AdminRole
}

@InputType()
export class AdminLoginInput {
    @IsEmail()
    @Field(() => String, { nullable: false })
    email: string

    @Field(() => String, { nullable: false })
    password: string
}