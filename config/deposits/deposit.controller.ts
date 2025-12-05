
export class DepositController {
    index(): Promise<any> {
        return Promise.resolve({});
    }
}

export class AdminDepositController {
    index(): Promise<any> {
        return Promise.resolve({});
    }

    update(): Promise<{ message: string }> {
        return Promise.resolve({ message: 'Success' });
    }
}
