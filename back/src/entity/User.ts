import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Index,
    ManyToOne,
    JoinColumn,
    CreateDateColumn, UpdateDateColumn
} from "typeorm"
import { IsEmail } from "class-validator"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    private id: string

    @Column({nullable: true})
    private avatar: string

    @Column()
    private lastname: string

    @Column()
    private firstname: string

    @Column({ unique: true })
    private username: string

    @Column()
    private genre: string

    @Column({ unique: true })
    @IsEmail()
    private mail: string

    @Column()
    private password: string

    @Column({ unique: true })
    private phone: string

    @Column()
    private address: string

    @Column()
    private zip_code: number

    @Column()
    private city: string

    @Column({nullable: true})
    private status: number

    @Column({nullable: true})
    private alert_count: number

    @CreateDateColumn()
    private created_at: Date

    @UpdateDateColumn()
    private updated_at: Date

    private roles;

    constructor(lastname: string, firstname: string, username: string,genre: string, phone: string, mail: string, password: string, address: string, city: string, zip_code: number) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.username = username;
        this.genre = genre;
        this.phone = phone;
        this.mail = mail;
        this.password = password;
        this.address = address;
        this.city = city;
        this.zip_code = zip_code;
    }

    public getId(): string {
        return this.id;
    }
    public getAvatar(): string {
        return this.avatar;
    }
    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }
    public getLastname(): string {
        return this.lastname;
    }
    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getFirstname(): string {
        return this.firstname;
    }
    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }
    public getUsername(): string {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }

    public getGenre(): string {
        return this.genre;
    }

    public setGenre(genre: string) {
        this.genre = genre;
    }

    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public getMail(): string {
        return this.mail;
    }
    public setMail(Mail: string): void {
        this.mail = Mail;
    }
    public getPhone(): string {
        return this.phone;
    }
    public setPhone(phone: string): void {
        this.phone = phone;
    }
    public getAddress(): string {
        return this.address;
    }
    public setAddress(Address: string): void {
        this.address = Address;
    }
    public getZip_code(): number {
        return this.zip_code;
    }
    public setZip_code(zip_code: number): void {
        this.zip_code = zip_code;
    }
    public getCity(): string {
        return this.city;
    }
    public setCity(city: string): void {
        this.city = city;
    }

    public getStatus(): number {
        return this.status;
    }
    public setStatus(status: number): void {
        this.status = status;
    }
    public getAlert_count(): number {
        return this.alert_count;
    }
    public setAlert_count(alert_count: number): void {
        this.alert_count = alert_count;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    public getRoles(){
        this.roles = ['USER'];
        return this.roles;
    }

}
