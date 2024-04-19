export default function TranslateSubject(subject: string) {
    if (subject == "appointment") {
        subject = "rendez-vous"
    } else if (subject == "prescription") {
        subject = "ordonnance";
    } else if (subject == "other") {
        subject = "autre";
    }
    return subject;
}