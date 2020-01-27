import { FormGroup } from '@angular/forms';


export function passwordMatchValidator(group: FormGroup) {
    if (group) {
        var password: string = group.value.password;
        var name: string = group.value.name;
        if (name && password) {
            if (password.search(name) !== -1) {
                return group.controls["password"].setErrors({ passerr: true });
            }
        }

        return null;
    }

    return null;
}