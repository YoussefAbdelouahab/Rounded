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

export enum SubjectType {
    appointment = "appointment",
    information = "information",
    prescription = "prescription",
    other = "other"
}

@Entity()
export class Call {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private from: string

    @Column()
    private to: string

    @Column()
    private date: Date

    @Column()
    private duration: number

    @Column({
        type: "enum",
        enum: SubjectType,
        default: SubjectType.appointment,
    })
    private subject: SubjectType

    @Column()
    private summary: string

    constructor(from: string, to: string, date: Date, duration: number, subject: SubjectType, summary: string) {
        this.from = from;
        this.to = to;
        this.date = date;
        this.duration = duration;
        this.subject = subject;
        this.summary = summary;
    }

    public getId(): number {
        return this.id;
    }

    //from
    public getFrom(): string {
        return this.from;
    }
    public setFrom(from: string): void {
        this.from = from;
    }

    //to
    public getTo(): string {
        return this.to;
    }
    public setTo(to: string): void {
        this.to = to;
    }

    //date
    public getDate(): Date {
        return this.date;
    }
    public setDate(date: Date): void {
        this.date = date;
    }

    //duration
    public getDuration(): number {
        return this.duration;
    }
    public setDuration(duration: number): void {
        this.duration = duration;
    }

    //subject
    public getSubject(): SubjectType {
        return this.subject;
    }
    public setSubject(subject: SubjectType): void {
        this.subject = subject;
    }

    //subject
    public getSummary(): string {
        return this.summary;
    }
    public setSummary(summary: string): void {
        this.summary = summary;
    }
}
