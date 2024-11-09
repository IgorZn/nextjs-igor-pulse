import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react'

function ModalWindow({
    open,
    close,
    onClick,
    children,
    title,
    bodyText,
    cancelText,
    confirmText,
}) {
    return (
        <>
            {children}
            <Dialog open={open} handler={close}>
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>{bodyText}</DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={close}
                        className="mr-1">
                        <span>{cancelText}</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={onClick}>
                        <span>{confirmText}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default ModalWindow
