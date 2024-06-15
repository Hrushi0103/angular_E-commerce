export interface SignUp{
    name:string,
    email:string,
    password:string
}

export interface u_signUp {
    name:string,
    email:string,
    phone:number,
    dob:string,
    password:string,
    country:string
}
export interface u_signIn{
    email:string,
    password:string
}

export interface SignIn{
    passward: any
    email:string,
    password:string
}

export interface product{
    [x: string]: any,
    name: any,
    price:number,
    color:string,
    catagory:string,
    discription:string,
    image:string
    id:string,
    quantity: undefined |number
}
 export interface cart {
    [x: string]: any,
    name: any,
    price:number,
    color:string,
    catagory:string,
    discription:string,
    image:string
    id:string,
    quantity: undefined |number,
    userId:string
 }
