import React from 'react';
import { addUser, changeName, nextUser, removeUser, toggleUser, updateUserOrder } from './userActions';

describe('userActions', () => {
    describe('should match snapshots', () => {
        it('should match addUser', function () {
            let addUserResult = addUser('name');
            addUserResult.user.image = 'imageUrl';

            expect(addUserResult).toMatchSnapshot();
        });

        it('should match removeUser', function () {
            const user = {
                name: 'Bob Ducca',
            };
            expect(removeUser(user)).toMatchSnapshot();
        });

        it('should match nextUser', function () {
            expect(nextUser()).toMatchSnapshot();
        });

        describe('toggleUser', () => {
            it('when user is active', function () {
                const user = {
                    name: 'Bob Ducca',
                    active: true,
                };

                expect(toggleUser(user)).toMatchSnapshot();
            });

            it('when user is not active', function () {
                const user = {
                    name: 'Bob Ducca',
                    active: false,
                };

                expect(toggleUser(user)).toMatchSnapshot();
            });
        });

        it('should match changeName', function () {
            const user = {
                name: 'Bob Ducca',
            };

            expect(changeName(user, 'Scott Barnes')).toMatchSnapshot();
        });

        it('should match updateUserOrder', function () {
            const users = [
                {
                    name: 'Bob Ducca',
                },
                {
                    name: 'Bobby Duccas',
                },
            ];

            expect(updateUserOrder(users)).toMatchSnapshot();
        });
    });
});
