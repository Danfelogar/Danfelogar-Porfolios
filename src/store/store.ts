import { map } from 'nanostores';


interface Props {
    showNavModal: boolean;
    activeNavLink: string;
}

export const $settings = map<Props>({
    showNavModal: false,
    activeNavLink: "",
})

export function changeStateOfShowNavModal() {
    $settings.set({
        ...$settings.get(),
        showNavModal: !$settings.get().showNavModal,
    })
}

export function changeActiveNavLink(link:string) {
    $settings.set({
        ...$settings.get(),
        activeNavLink: link,
    })
}