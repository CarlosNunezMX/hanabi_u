/*----------------------------------------------------------------------------*
    Copyright 2013-2015 Nintendo.  All rights reserved.

    These coded instructions, statements, and computer programs contain
    proprietary information of Nintendo of America Inc. and/or Nintendo
    Company Ltd., and are protected by Federal copyright law.  They may
    not be disclosed to third parties or copied or duplicated in any form,
    in whole or in part, without the prior written consent of Nintendo.
 *----------------------------------------------------------------------------*/

declare module nwf {
    module events {
        class Event {
            private _type;
            private _target;
            private _timestamp;
            /**
             * The `Event` class is used as the base class for the creation of `Event` objects, which are passed as parameters to event listeners when an event occurs.
             *
             *      // Create instance
             *      var myEvent = new nwf.events.Event( 'someEventName' );
             *
             * @see {@link nwf.events.EventDispatcher}
             * @class nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor(type: string);
            /**
             * Indicates the `EventTarget` to which the event was originally dispatched.
             * @property {Object} [target=null]
             * @readonly
             * @since 1.0
             */
            target: void;
            /**
             * The name of the event (case-insensitive). The name must be an XML name.
             * @property {string} [type='']
             * @readonly
             * @since 1.0
             */
            type: string;
            /**
             * The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @property {float} [timestamp=0]
             * @readonly
             * @since 1.0
             */
            timestamp: number;
            /**
             * Duplicates an instance of an `Event` subclass.
             * Returns a new `Event` object that is a copy of the original instance of the `Event` object.
             * You do not normally call `clone`; the `EventDispatcher` class calls it automatically when you re-dispatch an event; that is, when you call `dispatchEvent(event)` from a handler that's handling an event.<br /><br />
             * The new `Event` object includes all the properties of the original.<br />
             * @returns {nwf.events.Event}
             * @since 1.0
             */
            clone(): Event;
            /**
             * Returns a string containing all the properties of the `Event` object. The string is in the following format:
             * <p>[Event type=value bubbles=value cancelable=value]</p>
             *
             * @method toString
             * @returns {String}
             * @since 1.0
             */
            toString(): string;
        }
    }
}
declare module nwf {
    module events {
        class EventDispatcher {
            private _eventList;
            /**
             * The `EventDispatcher` class is the base class for all classes that dispatch events into the event flow.
             *
             * _Events are FIFO (first in, first out)._
             *
             *     // Create custom event
             *     var myEvent = new nwf.events.Event( 'someEventName' );
             *
             *     // Get dispatcher instance
             *     var dispatcher =  new nwf.events.EventDispatcher();
             *
             *     // Listen for custom event
             *     dispatcher.addEventListener( 'someEventName', function onCustomEvent( evt ){
             *         // Print dispatched event
             *         console.log( evt );
             *         // Remove this event listener if we're done with it
             *         dispatcher.removeEventListener( 'someEventName', onCustomEvent, this );
             *     }, this );
             *
             *     // ...
             *
             *     // Dispatch custom event some time in the future
             *     dispatcher.dispatchEvent( myEvent );
             *
             * _To prevent possible memory leaks, when you no longer need an event listener, remove it by calling `#removeEventListener` or `#removeAllEventListeners`. This is especially true when switching contexts by changing pages._
             *
             * @see {@link nwf.events.Event}
             * @class nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new `EventDispatcher` object.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Registers an event listener handler so that the listener can be notified when events are dispatched. Subsequent calls to `addEventListener` with a different listener and/or scope will result in the separate registration of the listener.
             *
             * To prevent possible memory leaks, when you no longer need an event listener, remove it by calling `#removeEventListener` or `#removeAllEventListeners`. This is especially true when switching contexts by changing pages.
             *
             * _If multiple identical `EventListeners` are registered on the same `EventTarget` with the same parameters, the duplicate instances are discarded._
             *
             * @param {String} type The event type for which the user is registering.
             * @param {Function} listener  The listener function that processes the event. This function must accept an `Event` object as its only parameter.
             * @param {Object} [scope=null]  The scope on which to apply the listener call. This will affect the value of `this` within the listener function block. By default the scope will be set to the window or "root" scope of the dispatcher object. Do not use this parameter when in strict mode, as it will cause an error.
             * @since 1.0
             */
            addEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Allows the removal of event listeners from the event target.
             *
             * _The `listener` function and `scope` must match that which was used to register the event._
             *
             * @see {@link #removeAllEventListeners}
             * @param {String} type Specifies the event type of the `EventListener` being removed.
             * @param {Function} listener  The listener function to be removed.
             * @param {Object} [scope=null]  The scope object of the `EventListener` being removed. If a listener was registered twice with different scopes, each must be removed separately.
             * @since 1.0
             */
            removeEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Removes **ALL** event listeners from the event target. Always double-check to make sure you really want to remove every event listener.
             * @since 1.0
             */
            removeAllEventListeners(): void;
            /**
             * Dispatches an event into the event flow. The event target is the `EventDispatcher` object upon which the `dispatchEvent()` method is called.
             * @param {nwf.events.Event} event The `Event` object to dispatch into the event flow.
             * @returns {Boolean} Returns `true` if the event was successfully dispatched. Returns `false` if the event failed to dispatch; this can happen if the event is malformed.
             * @since 1.0
             */
            dispatchEvent(event: any): boolean;
            /**
             * Checks whether the `EventDispatcher` object has any listeners registered for a specific type of event.
             * @param {String} type The type of event to check.
             * @returns {Boolean} Returns `true` if a listener of the specified type is registered, or `false` otherwise.
             * @since 1.0
             */
            hasEventListener(type: any): boolean;
            /**
             * Returns the string representation of the specified object.
             * @returns {String}
             * @since 1.0
             */
            toString(): string;
            private _getItemIndex(type, listener);
        }
    }
}
declare module nwf {
    module events {
        class NintendoAccountManagerEvent extends nwf.events.Event {
            /**
             * Defines events dispatched by the {@link nwf.act.NintendoAccountManager}.
             *
             * @see {@link nwf.act.NintendoAccountManager}
             * @class nwf.events.NintendoAccountManagerEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Encrypted service token.
             * Only set when `nwf.events.NintendoAccountManagerEvent.SERVICE_TOKEN_SUCCESS` or `nwf.events.NintendoAccountManagerEvent.EC_SERVICE_TOKEN_SUCCESS` are dispatched.
             * @property {String} [serviceToken=null]
             * @readonly
             * @since 1.0
             */
            serviceToken: void;
            /**
             * Error reason.
             * Only set when `nwf.events.NintendoAccountManagerEvent.SERVICE_TOKEN_FAIL` or `nwf.events.NintendoAccountManagerEvent.EC_SERVICE_TOKEN_FAIL` are dispatched.
             * @property {String} [errorText=null]
             * @readonly
             * @since 1.0
             */
            errorText: void;
            /**
             * Dispatched when the independent service token is requested and successfully received.
             * Use [getCurrentIndependentServiceToken](#!/api/nwf.act.NintendoAccountManager-method-getCurrentIndependentServiceToken) to read the last service token issued by the account server.
             * @property {String} [SERVICE_TOKEN_SUCCESS='accountServiceToken']
             * @static @constant
             * @since 1.0
             */
            static SERVICE_TOKEN_SUCCESS: string;
            /**
             * Dispatched when the independent service token is requested and fails.
             * Print the error (using `evt.errorText` in the callback) to discover the reason.
             * @property {String} [SERVICE_TOKEN_FAIL='accountServiceTokenError']
             * @static @constant
             * @since 1.0
             */
            static SERVICE_TOKEN_FAIL: string;
            /**
             * Dispatched when the E-Commerce service token is requested and successfully received.
             * Use [getCurrentEcServiceToken](#!/api/nwf.act.NintendoAccountManager-method-getCurrentEcServiceToken) to read the last service token issued by the account server.
             * @property {String} [EC_SERVICE_TOKEN_SUCCESS='accountEcServiceToken']
             * @static @constant
             * @since 1.3
             */
            static EC_SERVICE_TOKEN_SUCCESS: string;
            /**
             * Dispatched when the E-Commerce service token is requested and fails.
             * Print the error (using `evt.errorText` in the callback) to discover the reason.
             * @property {String} [EC_SERVICE_TOKEN_FAIL='accountEcServiceTokenError']
             * @static @constant
             * @since 1.3
             */
            static EC_SERVICE_TOKEN_FAIL: string;
        }
    }
}
declare module nwf {
    module act {
        class NintendoAccount {
            /**
             * Class containing data for working with Nintendo Accounts on the Wii U console.
             * <p>
             * This class is not instantiable using the <code>new</code> keyword. Instead use <code>NintendoAccountManager.getInstance().getActiveAccount()</code> or <code>NintendoAccountManager.getInstance().getAccountAtSlot(slotIndex)</code> to get an instance.
             * </p>
             * @class nwf.act.NintendoAccount
             * @author Ryan Lynd
             */
            /**
             * The account ID of the current account.
             *
             * * Users can specify their own IDs.
             * * An ID has 6 to 16 alphanumeric characters.
             * * An ID is guaranteed to be unique for each network account.
             * @property {String} [accountID='']
             * @readonly
             * @since 1.0
             */
            accountID: string;
            /**
             * The principal ID of the current account.
             * This ID is used to grab references to account information in event callbacks from the `nwf.fp.FriendPresence` class, with [getPresenceData](#!/api/nwf.fp.FriendPresence-method-getPresenceData). It is also used to speficy users when interacting with the `nwf.mv.Miiverse` and `nwf.nex.DataStore` classes.
             * @property {uint32} [principalID=0x000000]
             * @readonly
             * @since 1.0
             * @see nwf.fp.FriendPresence
             * @see nwf.mv.Miiverse
             * @see nwf.nex.DataStore
             */
            principalID: number;
            /**
            * A base64-encoded string of a 128-bit ID that conforms to the version 1 Universally Unique Identifier (UUID) specification, and is likely to be globally unique. However, because the ID space differs among applications, this ID cannnot distinguish accounts across titles.
            * @property {String} [uuid='']
            * @readonly
            * @since 1.5
            */
            uuid: string;
            /**
             * The slot index number this account occupies.
             * @property {Number} [slotIndex=0]
             * @readonly
             * @since 1.0
             */
            slotIndex: number;
            /**
             * The type of account: `NintendoAccountType.LOCAL` or `NintendoAccountType.NETWORK`. `NintendoAccountType.NETWORK` can access additional information.
             * @property {String} [accountType=NintendoAccountType.LOCAL]
             * @readonly
             * @since 1.0
             * @see nwf.act.NintendoAccountType.LOCAL
             * @see nwf.act.NintendoAccountType.NETWORK
             */
            accountType: string;
            /**
             * Returns `true` when "Wii U Shopping Services" is permitted. Returns `false` when it is restricted.
             * @property {Boolean} [eShopPurchaseAllowed=true]
             * @readonly
             * @since 1.0
             */
            eShopPurchaseAllowed: boolean;
            /**
             * Returns `true` when "Friend Registration" is permitted. Returns `false` when it is restricted.
             * @property {Boolean} [friendRegAllowed=true]
             * @readonly
             * @since 1.0
             */
            friendRegAllowed: boolean;
            /**
             * Returns `true` when "Internet Browser" is permitted. Returns `false` when it is restricted.
             * @property {Boolean} [internetBrowserAllowed=true]
             * @readonly
             * @since 1.0
             */
            internetBrowserAllowed: boolean;
            /**
             * Returns `true` when "Entertainment Excluding Games" is permitted. Returns `false` when it is restricted.
             * @property {Boolean} [internetMovieAllowed=true]
             * @readonly
             * @since 1.0
             */
            internetMovieAllowed: boolean;
            /**
             * Returns `true` when "Online Interaction in Games" is permitted. Returns `false` when it is restricted.
             *
             * **Note**: If the Application Type in the ROM Info page of Project Settings is set to Service Application, this parental control does not apply and `nwf.act.NintendoAccountManager#disableNetworkCommunicationParentalControlCheck` should not be called.
             * @property {Boolean} [networkCommunicationAllowed=true]
             * @readonly
             * @since 1.0
             */
            networkCommunicationAllowed: boolean;
            /**
             * Gets restriction level of "Miiverse".
             * @property {Number} [miiverseRestrictionLevel = NintendoAccount.RESTRICTION_NONE]
             * @readonly
             * @since 1.0
             * @see nwf.act.NintendoAccount.RESTRICTION_NONE
             * @see nwf.act.NintendoAccount.RESTRICTION_PART
             * @see nwf.act.NintendoAccount.RESTRICTION_FULL
             */
            miiverseRestrictionLevel: number;
            /**
             * The country code (3166-1 alpha-2 ISO) setting of the target account.
             * @property {String}  [country='']
             * @readonly
             * @since 1.0
             */
            country: string;
            /**
             * The user-specified time zone of the target account.
             * @property {String} [timeZone='']
             * @readonly
             * @since 1.0
             */
            timeZone: string;
            /**
             * The user's Mii Name.
             * @property {String} [miiName='']
             * @since 1.8.2
             * @readonly
             */
            miiName: string;
            /**
             * @property {Number} [persistentID=0x000000]
             * @removed 1.5 Removed from API. Use `nwf.act.NintendoAccount.uuid` instead.
             */
            persistentID: number;
            /**
             * Determines whether the account specified is over the given age. This is done using the account's date of birth, which is registered in the current network time and account held by the system and specified by the user. It can also be used in an environment that is not connected to the Internet.
             * @method isOverAge
             * @param {Number} age The age that you want to compare with.
             * @returns {Boolean} Returns `true` if this account is over the given age.
             * Returns `false` otherwise.
             *
             * **Note:** Always returns false when sideloading.
             * Use a Running Client or mastered ROM to test accurately.
             *
             * @since 1.0
             */
            isOverAge(age: number): boolean;
            /**
             * @removed 1.5 Removed from API. Use `nwf.act.NintendoAccount.uuid` instead.
             */
            getTransferableID(uniqueId: any): void;
            /**
             * No Restriction
             * @property {Number} [RESTRICTION_NONE=0]
             * @static @constant
             * @since 1.0
             */
            RESTRICTION_NONE: number;
            static RESTRICTION_NONE: number;
            /**
             * Partial Restriction
             * @property {Number} [RESTRICTION_PART=1]
             * @static @constant
             * @since 1.0
             */
            static RESTRICTION_PART: number;
            /**
             * Full Restriction
             * @property {Number} [RESTRICTION_FULL=2]
             * @static @constant
             * @since 1.0
             */
            static RESTRICTION_FULL: number;
        }
    }
}
declare module nwf {
    module act {
        /**
         * The Parental Controls Manager is provided as an optional library to aid implementation and guideline compliance of parental control override functionality.

         * The Parental Controls Manager implements the message flow prescribed in the Wii U Guidelines sections 2.16.1, 2.16.2, and 10.1.2, including temporary and permanent parental control overrides handled via session storage and local storage, respectively.
         *
         * Usage
         * ---
         *
         * This library can be used by video-on-demand applications without modification by including the library in the main HTML file and calling one function:
         *
         *      <script src="path/to/SupportLibraries.min.js" charset="utf-8"></script>
         *      <script>
         *          nwf.act.ParentalControlsManager.initialize(
         *               "This application allows you to view videos from the internet",
         *               function(success) {
         *                  if(success) {
         *                      // handle success
         *                  } else {
         *                      // handle failure
         *                  }
         *               }
         *          );
         *      </script>
         *
         * @class nwf.act.ParentalControlsManager
         * @lib SupportLibraries.js
         * @author Nate Long
         * @author Shawn Gates
         */
        class ParentalControlsManager {
            /**
             * Starts the parental control override process.
             *
             * @method initialize
             * @param {String} message A custom message to display during the first step of the override process.
             * @param {Function} callback The callback to be fired when the override process is complete in any case: success, failure, or cancellation.
             * @param {boolean} callback.success This is set to `true` if the Parental Controls were successfully overridden, or `false` if it was not.
             * @param {boolean} [allowPermanentOverride=false] Set this to `true` if the manager should allow permanent storage of the PIN code, or `false` if it should not.
             * @static
             * @since 1.8.3
             * @async
             */
            static initialize(message: string, callback: any, allowPermanentOverride?: boolean): void;
            /**
             * Checks for a permanent override stored on the file system.
             * Use this in conjunction with `clearOverrides` for management of permanent overrides.
             *
             * @method isPINStored
             * @return {boolean} This is set to `true` if a valid PIN is stored on the file system, or `false` if not.
             * @static
             * @since 1.8.3
             * @async
             */
            static isPINStored(): boolean;
            /**
             * Remove any existing overrides, which will cause the next override request to prompt the user for a PIN.
             *
             * @method clearOverrides
             * @since 1.8.3
             * @static
             */
            static clearOverrides(): void;
            /**
             * Pause the Parental Controls override process, hiding any current dialogs and saving the state.
             *
             * @method pauseFlow
             * @see nwf.act.ParentalControlsManager.continueFlow
             * @since 1.8.3
             * @static
             */
            static pauseFlow(): void;
            /**
             * Continue the Parental Controls override process, starting from where it left off when `#pauseFlow` was called.
             *
             * @method continueFlow
             * @since 1.8.3
             * @static
             */
            static continueFlow(): void;
        }
    }
}
declare module nwf {
    module act {
        /**
         * The Nintendo Account Type.
         *
         * @enum nwf.act.NintendoAccountType
         * @author Ryan Lynd
         * @author Shawn Gates
        */
        var NintendoAccountType: {
            LOCAL: string;
            NETWORK: string;
        };
    }
}
declare module nwf {
    module act {
        class NintendoAccountManager extends nwf.events.EventDispatcher {
            /**
             * Class for accessing Nintendo Accounts on the Wii U console.
             *
             * The `NintendoAccountManager` class dispatches the following events:
             *
             * - nwf.events.NintendoAccountManagerEvent.SERVICE_TOKEN_FAIL
             * - nwf.events.NintendoAccountManagerEvent.SERVICE_TOKEN_SUCCESS
             * - nwf.events.NintendoAccountManagerEvent.EC_SERVICE_TOKEN_FAIL
             * - nwf.events.NintendoAccountManagerEvent.EC_SERVICE_TOKEN_SUCCESS
             *
             * @class nwf.act.NintendoAccountManager
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @singleton
             */
            /**
             * @private
             * The `new` method is not used to get an instance of `NintendoAccountManager`; use `#getInstance` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * The number of accounts that exist. A Nintendo Account exists if the result is greater than 0.
             *
             * __Note:__ _This is NOT the number of account slots._
             * @property {uint8} [totalAccounts=0]
             * @since 1.0
             * @readonly
             */
            totalAccounts: number;
            /**
             * The total number of slots available for accounts.
             *
             * @property {uint8} [availableSlots=2]
             * @since 1.0
             * @readonly
             */
            availableSlots: number;
            /**
             * Gets the `NintendoAccount` instance of the active account.
             *
             * @returns {nwf.act.NintendoAccount}
             * @since 1.0
             */
            getActiveAccount(): nwf.act.NintendoAccount;
            /**
             * Gets the `NintendoAccount` instance of the specified slot.
             * @param {Number} slotNumber The slot number of the account to retrieve.
             * @returns {nwf.act.NintendoAccount}
             * @since 1.0
             */
            getAccountAtSlot(slotNumber: number): nwf.act.NintendoAccount;
            /**
             * Examines the slot with the given number, and determines whether an account exists.
             * @param {Number} slotNumber The slot number to test against.
             * @returns {Boolean} Returns `false` if the slot is unoccupied.
             * Returns `true` if the slot is occupied with an account.
             * @since 1.0
             */
            isSlotOccupied(slotNumber: number): boolean;
            /**
             * Acquires a new independent service token from the server and must be called at least one time per application lifecycle.
             * Should be called again if a timeout for the token is implemented; otherwise use `#getCurrentIndependentServiceToken`.
             * @returns {Boolean} Returns `true` if the asynchronous process of acquiring the independent service token has started successfully.
             * Returns `false` if the asynchronous process of acquiring the independent service token has failed to start.
             * @see nwf.events.NintendoAccountManagerEvent#SERVICE_TOKEN_SUCCESS
             * @see nwf.events.NintendoAccountManagerEvent#SERVICE_TOKEN_FAIL
             * @since 1.0
             * @async
             */
            acquireNewIndependentServiceToken(): boolean;
            /**
            * Returns the last token that was received from the server.
            * @returns {String}      The last independent service token the application has acquired from the authentication server.
            * If "Do Not Require Service Token" is set, then `"test token"` is returned instead.
            * Otherwise it will be `""` (an empty `String`), which is a "falsy" value.
            * So it's safe to simply check `if (acctmngr.getCurrentIndependentServiceToken()) { ...it was a valid token... }`.
            * @since 1.0
            */
            getCurrentIndependentServiceToken(): string;
            /**
            * Acquires a new e-commerce token from the server and must be called at least one time per application lifecycle.
            * Should be called again if a timeout for the token is implemented; otherwise use `#getCurrentEcServiceToken`.
            * @returns {Boolean} Returns `true` if the asynchronous process of acquiring the e-commerce service token has started successfully.
            * Returns `false` if the asynchronous process of acquiring the e-commerce service token has failed to start.
            * @see nwf.events.NintendoAccountManagerEvent#EC_SERVICE_TOKEN_SUCCESS
            * @see nwf.events.NintendoAccountManagerEvent#EC_SERVICE_TOKEN_FAIL
            * @since 1.3
            * @async
            */
            acquireNewEcServiceToken(): boolean;
            /**
            * Returns the last e-commerce service token that was received from the server.
            * @returns {String}      The last e-commerce service token the application has acquired from the authentication server.
            * By default, this will return `""` (an empty `String`), which is a "falsy" value.
            * So it's safe to simply check `if (acctmngr.getCurrentEcServiceToken()) { ...it was a valid token... }`.
            * @since 1.3
            */
            getCurrentEcServiceToken(): string;
            /**
             * Disables the check for the "Online Interaction in Games" parental control, allowing the system to access Nintendo Network services (e.g., Miiverse and NEX).
             *
             * If the Application Type in the ROM Info page of Project Settings is set to Service Application, this is called automatically at startup and should not be called manually, as the "Online Interaction in Games" parental control does not apply.
             *
             * If the Application Type in the ROM Info page of Project Settings is set to Game Application and the "Online Interaction in Games" parental control needs to be temporarily or permanently lifted, the application can use this method. Make sure to conform to the Parental Controls chapter in the Wii U Guidelines when temporarily or permanently lifting parental controls.
             *
             * @see nwf.system.WiiUSystem.verifyParentalControlPIN
             * @see nwf.act.NintendoAccount#networkCommunicationAllowed
             * @since 1.2
             */
            disableNetworkCommunicationParentalControlCheck(): void;
            /**
             * Console Type Retail.
             * @property {uint32} [TOTAL_SLOTS=12]
             * @since 1.0
             * @static @constant
             */
            static TOTAL_SLOTS: number;
            /**@ignore*/
            private static s_instance;
            /**
             * Accesses an instance of the `NintendoAccountManager` singleton.
             * @method getInstance
             * @returns {nwf.act.NintendoAccountManager} The `NintendoAccountManager` singleton instance.
             * @since 1.0
             * @static
             */
            static getInstance(): NintendoAccountManager;
            /**
             * Tests for class availability.
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported(): boolean;
        }
    }
}
declare module nwf {
    module amiibo {
        class Info {
            /**
             * Structure that stores common region information.
             *
             * @class nwf.amiibo.Info
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Character ID.
             *
             * @property {Number} [characterID=0]
             * @since 1.9.0
             */
            characterID: Number;
            /**
             * Figure attribute.
             *
             * @property {Number} [figureType=0]
             * @since 1.9.0
             */
            figureType: Number;
            /**
             * Figure version.
             *
             * @property {Number} [figureVersion=0]
             * @since 1.9.0
             */
            figureVersion: Number;
            /**
             * The number of the amiibo figure.
             *
             * @property {Number} [numberingID=0]
             * @since 1.9.0
             */
            numberingID: Number;
            /**
             * Series ID.
             *
             * @property {Number} [seriesID=0]
             * @since 1.9.0
             */
            seriesID: Number;
            /**
             * The number of times the application area of the figure has been written to.
             *
             * @property {Number} [writes=0]
             * @since 1.9.0
             */
            writes: Number;
            /**
             * The country of the account the figure was registered to.
             *
             * @property {Number} [country=0]
             * @since 1.9.0
             */
            country: Number;
            /**
             * The nickname assigned to the amiibo figure.
             *
             * @property {String} [name=0]
             * @since 1.9.0
             */
            name: String;
            /**
             * The date that registration was performed on the figure. This date will not change once registration occurs.
             *
             * __Note:__ The `Date` object returned by this property will have zeros for its hour, minute, and seconds because the amiibo library only tracks the day, date, and year that the amiibo was registered.
             *
             * @property {Date} [registerDate=Date]
             * @since 1.9.0
             */
            registerDate: Date;
            /**
             * The last write date on the figure. This could be updated when calling nwf.amiibo.Reader#launchSettings, or from another application that supports writing to amiibo.
             *
             * __Note:__ The `Date` object returned by this property will have zeros for its hour, minute, and seconds because the amiibo library only tracks the day, date, and year of the last write to the amiibo figure.
             *
             * @property {Date} [lastWriteDate=Date]
             * @since 1.9.0
             */
            lastWriteDate: Date;
            /**
             * Returns whether the amiibo has been registered to an account.
             *
             * @property {Boolean} [isRegistered=false]
             * @since 1.9.0
             */
            isRegistered: Boolean;
        }
    }
}
declare module nwf {
    module amiibo {
        /**
         * Error constants for the amiibo `Reader` class.
         *
         * @enum nwf.amiibo.Error
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var Error: {
            NONE: number;
            INVALID_STATE: number;
            TAG_NOT_FOUND: number;
            TIMEOUT: number;
            LOST_BEFORE_ACTIVATION: number;
            LOST_TAG_IS_ACTIVE: number;
            LOST_DETECT_ERROR: number;
            LOST_CONNECTION_LOST: number;
            LOST_UNKNOWN: number;
            CORRUPT_NO_DATA: number;
            CORRUPT_DATA_FOUND: number;
            INVALID_TAG: number;
            UNKNOWN_ERROR: number;
        };
    }
}
declare module nwf {
    module amiibo {
        /**
         * `State` constants for the amiibo `Reader` class.
         *
         * @enum nwf.amiibo.State
         * @see nwf.amiibo.Reader#state
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var State: {
            UNINITIALIZED: number;
            INITIALIZED: number;
            SEARCHING: number;
            CONNECTING: number;
            DISCONNECTED: number;
            CONNECTED: number;
            UNEXPECTED: number;
        };
    }
}
declare module nwf {
    module amiibo {
        /**
         * `SettingsMode` constants for the amiibo `Reader` class.
         *
         * @enum nwf.amiibo.SettingsMode
         * @see nwf.amiibo.Reader#launchSettings
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var SettingsMode: {
            REGISTER: number;
            RESTORE: number;
        };
    }
}
declare module nwf {
    module events {
        class AmiiboEvent extends Event {
            /**
             * Defines events dispatched by instances of the amiibo `Reader` class.
             *
             * @class nwf.events.AmiiboEvent
             * @see {@link nwf.amiibo.Reader}
             * @extends nwf.events.Event
             * @author Cory O'Regan
             * @author Ryan Lynd
             * @author Shawn Gates
             * @author Nate Long
             */
            constructor();
            /**
             * Error. Only exists when a nwf.events.AmiiboEvent.FIGURE_LOST event is dispatched.
             * @property {Number} [errorID=nwf.amiibo.Error.NONE]
             * @readonly
             * @since 1.9.0
             */
            errorID: number;
            /**
             *
             *
             * @property {string} [FIGURE_DETECTED='figureDetected']
             * @since 1.9.0
             * @static @constant
             */
            static FIGURE_DETECTED: string;
            /**
             *
             *
             * @property {string} [FIGURE_LOST='figureLost']
             * @since 1.9.0
             * @static @constant
             */
            static FIGURE_LOST: string;
        }
    }
}
declare module nwf {
    module amiibo {
        class Reader extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with amiibo.
             *
             * __Note:__ The amiibo feature must be enabled in the Features page for `nwf.amiibo` to be defined.
             *
             * The `Reader` class dispatches the following events:
             *
             * - nwf.events.AmiiboEvent.FIGURE_DETECTED
             * - nwf.events.AmiiboEvent.FIGURE_LOST
             *
             * @class nwf.amiibo.Reader
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Cory O'Regan
             * @author Ryan Lynd
             * @author Shawn Gates
             * @author Aaron Ward
             * @author Nate Long
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a `Reader` object; use `#getInstance` instead.
             * @method constructor
             * @since 1.9.0
             */
            constructor();
            /**
             * Returns the current state.
             *
             * @property {Number} [state=nwf.amiibo.State.UNINITIALIZED]
             * @see nwf.amiibo.State
             * @since 1.9.0
             */
            state: Number;
            /**
             * Begins detection of amiibo figures.
             *
             * @since 1.9.0
             * @see nwf.events.AmiiboEvent.FIGURE_DETECTED
             * @see nwf.events.AmiiboEvent.FIGURE_LOST
             * @see nwf.amiibo.Error
             * @return {Number} An `nwf.amiibo.Error` code indicating the success of starting the operation.
             * @async
             */
            startDetect(): Number;
            /**
             * Halts detection of amiibo figures.
             *
             * @since 1.9.0
             * @see nwf.events.AmiiboEvent.FIGURE_LOST
             * @see nwf.amiibo.Error
             * @return {Number} An `nwf.amiibo.Error` code indicating the success of starting the operation.
             * @async
             */
            stopDetect(): Number;
            /**
             * Opens the amiibo Settings Application. This application allows users to register the amiibo figure or restore it to backed-up data.
             *
             * @param {Number} mode Which mode of the amiibo Settings Application to load. Can be either `{@link nwf.amiibo.SettingsMode#REGISTER}` or `{@link nwf.amiibo.SettingsMode#RESTORE}`.
             * @param {Function} callback Function to call when the amiibo Settings application is exited.
             * @param {Error} callback.result An `nwf.amiibo.Error` code showing the results of the action.
             * @param {nwf.amiibo.Info} callback.data An `nwf.amiibo.Info` object containing updated information for the amiibo figure.
             * @return {Number} An `nwf.amiibo.Error` code indicating the success of starting the operation.
             * @see nwf.amiibo.Error
             * @since 1.9.0
             * @async
             */
            launchSettings(mode: number, callback: any): Number;
            /**
             * Fetches shared info from the amiibo figure.
             *
             * @param {Function} callback Function to call when the process has completed.
             * @param {Error} callback.result An `nwf.amiibo.Error` code showing the results of the action.
             * @param {nwf.amiibo.Info} callback.data `{@link nwf.amiibo.Info Info}` object returned by the method.
             * @return {Number} An `nwf.amiibo.Error` code indicating the success of starting the operation.
             * @see nwf.amiibo.Error
             * @since 1.9.0
             * @async
             */
            getInfo(callback: any): Number;
            /**
             * Accesses an instance of the `Reader` singleton.
             *
             * @method getInstance
             * @returns {nwf.amiibo.Reader} The `Reader` singleton instance.
             * @since 1.9.0
             * @static
             */
            static getInstance(): typeof Reader;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    module aoc {
        class AOCTitle extends nwf.events.EventDispatcher {
            /**
             * The `AOCTitle` class provides functions for interacting with add-on content.
             *
             *      // Get a reference to the first AOCTitle object
             *      var titleList = nwf.aoc.AOC.listTitles();
             *      var title1 = titleList[ 0 ];
             *
             *      // Add an event listener for when `AOCTitle` is opened so we can safely access it
             *      title1.addEventListener( nwf.events.AOCTitleEvent.OPEN_COMPLETE, onOpen, this );
             *
             *      // We should also add a listener in case `AOCTitle` fails to open
             *      title1.addEventListener( nwf.events.AOCTitleEvent.OPEN_ERROR, onError,this );
             *
             *      // Open event handler
             *      function onOpen( evt ){
             *          // We can now safely access the `systemPath` property and all of the other methods of the `AOCTitle` object
             *          sysPath = evt.target.systemPath;
             *          titleDir = evt.target.getDirectory();
             *
             *          // When you are done with the `AOCTitle` object you can close it
             *          evt.target.close();
             *      }
             *
             *      // Error event handler
             *      function onError( evt ){
             *          // Handle the error
             *      }
             *
             *      // Now we can call the `open` method
             *      title1.open();
             *
             * The `AOCTitle` class dispatches the following events:
             *
             * - nwf.events.AOCTitleEvent.OPEN_COMPLETE
             * - nwf.events.AOCTitleEvent.OPEN_ERROR
             *
             * @class nwf.aoc.AOCTitle
             * @extends nwf.events.EventDispatcher
             * @author Cory O'Regan
             * @author Shawn Gates
            */
            /**
            * @private
            * The `new` method is not used to get an instance of `AOCTitle`; use `nwf.aoc.AOC.listTitles` instead.
            * @method constructor
            * @since 1.0
            */
            constructor();
            /**
             * Title ID.
             * @property {uint64} [titleID=0]
             * @readonly
             * @since 1.1
             */
            titleID: number;
            /**
             * Group ID.
             * @property {uint32} [groupID=0]
             * @readonly
             * @since 1.1
             */
            groupID: number;
            /**
             * Title version.
             * @property {uint16} [version=0]
             * @readonly
             * @since 1.1
             */
            version: number;
            /**
             * Fully qualified system path of this add-on content's directory.
             *
             * __Note:__ Will be `null` until `nwf.events.AOCTitleEvent.OPEN_COMPLETE` has been fired.
             *
             * @property {String} [systemPath='']
             * @readonly
             * @since 1.1
             */
            systemPath: string;
            /**
            * Opens this object's add-on content title.
            * @returns {Boolean} Returns `true` if the asynchronous open process has started successfully, or `false` otherwise.
            * @since 1.1
            */
            open(): void;
            /**
            * Closes this object's add-on content title.
            * @returns {Number} An error code defined by the `nwf.aoc.AOCError` enum.
            * @since 1.1
            */
            close(): void;
            /**
            * Gets a `Directory` object set to this title's root directory.
            * @returns {nwf.io.Directory} `nwf.io.Directory` object that is set to this title's root directory.
            * @since 1.1
            */
            getDirectory(): void;
            /**
            * Deletes add-on content.
            *
            *       // Assume we have an `AOCTitle` object called 'title'
            *
            *       function onOpen( evt ){
            *
            *           // We can now safely access and delete the contents of the `AOCTitle` object
            *
            *           // First we get a reference to the `AOCItems` we would like to delete
            *           var itemList = title.getPurchasedItems();
            *           var item1 = itemList[ 0 ];
            *           var item2 = itemList[ 1 ];
            *
            *           // Then we pass their indices to the `deleteContent` method as an array
            *           title.deleteContent( [ item1.index, item2.index ] );
            *
            *       }
            *
            *       title.open();
            *
            * **Note:** When sideloading, `deleteContent` will delete the actual content directory on the host PC.
            * Make sure a backup copy is available when testing this function.
            *
            * @param {Number[]} itemIndices Array of content indices to delete.
            * @returns {Number} An error code defined by the `nwf.aoc.AOCError` enum.
            * @since 1.1
            */
            deleteContent(itemIndices: any): void;
            /**
            * Gets an array of system paths to each item of the purchased add-on content.
            * @returns {String[]} Array of strings that are the system paths of each purchased add-on content item.
            * @since 1.1
            */
            getPurchasedContentPaths(): void;
            /**
            * Returns an array of `{@link nwf.aoc.AOCItem AOCItem}` objects for each of the purchased `{@link nwf.aoc.AOCItem AOCItems}`.
            *
            * Returns {@link null} if no items exist.
            *
            * @returns {nwf.aoc.AOCItem[]|null} Array of `AOCItem` objects.
            * @since 1.2
            */
            getPurchasedItems(): void;
        }
    }
}
declare module nwf {
    module aoc {
        class AOCItem {
            /**
             * The `AOCItem` class provides functions for interacting with purchased content items.
             *
             *
             * @class nwf.aoc.AOCItem
             * @author Ryan Lynd
             * @author Shawn Gates
            */
            /**
             * Data content ID.
             * @property {String} [id=null]
             * @readonly
             * @since 1.2
             */
            id: void;
            /**
             * Data content index.
             * @property {uint32} [index=null]
             * @readonly
             * @since 1.2
             */
            index: void;
            /**
             * Fully qualified system path of the content's data.
             * @property {String} [systemPath=null]
             * @readonly
             * @since 1.2
             */
            systemPath: void;
            /**
             * Gets a Directory object set to this item's root directory.
             * @returns {nwf.io.Directory} `nwf.io.Directory` object that is set to this item's root directory.
             * @since 1.2
             */
            getDirectory(): void;
        }
    }
}
declare module nwf {
    module events {
        class AOCTitleEvent extends Event {
            /**
             * An `AOCTitleEvent` object is triggered when an asynchronous method is called from the Nintendo Web Framework AOC API.
             *
             * @class nwf.events.AOCTitleEvent
             * @see {@link nwf.aoc.AOCTitle}
             * @extends nwf.events.Event
             * @author Cory O'Regan
             * @author Shawn Gates
             */
            constructor();
            /**
             * Integer value of the error that triggered the event.
             * @property {int} [errorID=AOCError.ERROR_NONE]
             * @readonly
             * @since 1.1
             * @see nwf.aoc.AOCError.ERROR_NONE
             */
            errorID: number;
            /**
             * Dispatched when a title open is successful. Triggered by [nwf.aoc.AOCTitle#open](#!/api/nwf.aoc.AOCTitle-method-open).
             * @property {string} [OPEN_COMPLETE='openComplete']
             * @since 1.1
             * @static @constant
             */
            static OPEN_COMPLETE: string;
            /**
             * Dispatched when a title open is unsuccessful. Triggered by [nwf.aoc.AOCTitle#open](#!/api/nwf.aoc.AOCTitle-method-open).
             * @property {string} [OPEN_ERROR='openError']
             * @since 1.1
             * @static @constant
             */
            static OPEN_ERROR: string;
        }
    }
}
declare module nwf {
    module aoc {
        /**
         * `AOCError` constants for `AOCTitle` method return values of the `errorID` property of an `AOCTitleEvent`.
         *
         * @enum nwf.aoc.AOCError
         * @author Cory O'Regan
         */
        var AOCError: {
            ERROR_NONE: number;
            ERROR_INVALID_PARAM: number;
            ERROR_NOT_INITIALIZED: number;
            ERROR_NOT_OPENED: number;
            ERROR_ALREADY_OPENED: number;
            ERROR_CLOSE_FAILURE: number;
            ERROR_EXCEED_LIMIT: number;
            ERROR_NOT_FOUND_TITLE: number;
            ERROR_NOT_FOUND_CONTENT: number;
            ERROR_ACCESS_DENIED: number;
            ERROR_INTERNAL_ERROR: number;
        };
    }
}
declare module nwf {
    module aoc {
        /**
         * The `AOC` class provides static functions for managing add-on content.
         *
         * __Note:__ The Add-on Content feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.aoc` to be defined.
         *
         *     // Get a reference to the first `AOCTitle` object
         *     var titleList = nwf.aoc.AOC.listTitles();
         *     var title1 = titleList[ 0 ];
         *
         * @class nwf.aoc.AOC
         * @author Cory O'Regan
         * @author Shawn Gates
        */
        class AOC {
            /**
              * Gets a list of available add-on content titles.
              * @returns {nwf.aoc.AOCTitle[]} A list of `AOCTitle` objects.
              * @since 1.1
              * @static
              * @method listTitles
             */
            static listTitles(): void;
            /**
             * Asynchronously retrieves a list of available add-on content titles.
             *
             * The list of titles (`nwf.aoc.AOCTitle[]`) is passed with the first callback parameter.
             *
             *     nwf.aoc.AOC.listTitlesAsync(function(titleList) {
             *          // Check to be sure that there are titles in the list
             *          if (titleList.length > 0) {
             *              // Work with list of AOCTitle objects...
             *          } else {
             *              // No titles available...
             *          }
             *      });
             *
             * @param {Function} callback The callback function to receive the list of titles.
             * @param {Array|null} callback.titleList An array of AOC titles.
             * @returns {int} Error status code. See: {@link nwf.aoc.AOCError}
             * @since 1.2
             * @static
             * @async
             * @method listTitlesAsync
            */
            static listTitlesAsync(callback: any): void;
        }
    }
}
declare module nwf {
    module display {
        /**
         * Interface class for all `nwf` Display classes.
         *
         * _This class is for documentation purposes only._
         *
         * @class nwf.display.IDisplay
         * @author Ryan Lynd
         * @author Shawn Gates
         * @extends nwf.events.EventDispatcher
         */
        class IDisplay extends nwf.events.EventDispatcher {
            _initialized: boolean;
            _hasInputEvents: boolean;
            _id: number;
            _width: number;
            _height: number;
            _viewportFilter: string;
            _attached: boolean;
            _hidden: boolean;
            _window: Window;
            _type: string;
            _aspectRatio: string;
            _bounds: any;
            _viewport: any;
            /**
             * @private
             * The `new` method is not used to get an instance of `IDisplay`.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * When set to `true`, Screen Burn-In Reduction is enabled.
             * When set to `false`, the feature is disabled.
             *
             * The default value of `dimmingEnabled` is `true`.
             * Unless disabled in System Settings, the Wii U automatically lowers the TV screen brightness to 25% and the GamePad screen brightness to 30% if the system does not receive user input for approximately five minutes.
             *
             * If `dimmingEnabled` is set to `false`, Screen Burn-In Reduction will be disabled even if it is enabled in System Settings.
             * Setting `dimmingEnabled` back to `true` after setting it to `false` will reset `timeBeforeDimming` back to five minutes.
             * Therefore, in the absence of user input, the screen will dim again five minutes after setting `dimmingEnabled` back to `true`.
             *
             * __Note:__ If the user has disabled Screen Burn-In Reduction in System Settings, this property will always return `false`.
             *
             * @property {Boolean} [dimmingEnabled=true]
             * @since 1.0
             */
            dimmingEnabled: boolean;
            /**
             * Adjusts the volume of all media coming out of the speakers associated with the display. This value has a range of 0.0 to 1.0 and will be clamped when given a value that is out of range.
             *
             * @property {Number} [volume=1.0]
             * @since 1.8.3
             */
            volume: number;
            /**
             * Unique ID of the display. Assigned by the system.
             * @property {int} [id=1]
             * @readonly
             * @since 1.0
             */
            id: number;
            /**
             * Display Type of the display.
             * @property {String} [type=nwf.display.DisplayType.GENERIC]
             * @readonly
             * @since 1.0
             * @see nwf.display.DisplayType.GAMEPAD
             * @see nwf.display.DisplayType.TV
             * @see nwf.display.DisplayType.GENERIC
             * @see nwf.display.DisplayType.SHARED
             */
            type: string;
            /**
             * Current display aspect ratio.
             * This is set by the user in the Wii U preference menu and may not reflect their actual display if it has been improperly configured.
             * @property {String} [aspectRatio=nwf.display.AspectRatio.WIDE_16X9]
             * @readonly
             * @since 1.0
             * @see nwf.display.AspectRatio.STANDARD_4X3
             * @see nwf.display.AspectRatio.WIDE_16X9
             */
            aspectRatio: string;
            /**
             * Returns `true` if this display has been loaded, either by being set as a Start Page or if the `#load` method is executed. Returns `false` otherwise.
             * @property {Boolean} [attached=false]
             * @readonly
             * @since 1.0
             */
            attached: boolean;
            /**
             * Returns `true` if this display is hidden, and `false` if it is not.
             * A hidden display is not displayed on the screen, but all display properties and methods are valid.
             * By default, `hidden` is set to `true`.
             * To show a display, call #show().
             * @property {Boolean} [hidden=true]
             * @readonly
             * @since 1.0
             */
            hidden: boolean;
            /**
             * The size and location of the area on this display that is drawn to.
             * In Shared WebView mode, this can be changed with the `#setViewport` method.
             * @property {Object} [bounds={x:0, y:0, width:854, height:480}]
             * @readonly
             * @since 1.0
             */
            bounds: any;
            /**
             * The size and location of the area in the WebView that is displayed on this display.
             * In Shared WebView mode, this can be changed with the `#setViewport` method, and the default is `{x:0, y:0, width:1280, height:720}`, or the same value as `nwf.display.TVDisplay#viewport`.
             * This will make the displays mirror each other.
             * @property {Object} [viewport={x:0, y:0, width:854, height:480}]
             * @readonly
             * @since 1.3
             */
            viewport: any;
            /**
             * The width of this display in pixels.
             * @property {int} [width=854]
             * @readonly
             * @since 1.0
             */
            width: number;
            /**
             * The height of this display in pixels.
             * @property {int} [height=480]
             * @readonly
             * @since 1.0
             */
            height: number;
            /**
             * Reference to the top `HTML Window` object associated with this display.
             * Each display has one top window object.
             * Scripts executing in the context of a display are scoped to this window object and/or its child frames.
             *
             * __Note:__ Will return `null` until the display has been loaded.
             * The display will load if it is either set as a Start Page or if the display's `#load` method is executed.
             * @property {HTMLWindow} [window=null]
             * @readonly
             * @since 1.0
             */
            window: any;
            /**
             * Gets the remaining time in seconds before auto-dimming occurs.
             * Counter decrements every second when no user input is detected.
             * Upon user input, the counter is reset to the the value of 300 seconds.
             *
             * @property {uint32} [timeBeforeDimming=300]
             * @readonly
             * @since 1.0
             */
            timeBeforeDimming: number;
            /**
             * The current filter mode of the viewport.
             * @property {String} [viewportFilter=nwf.display.ViewportFilter.POINT]
             * @see nwf.display.ViewportFilter
             * @readonly
             * @since 1.3
             */
            viewportFilter: string;
            /**
             * Loads a page on the display.
             * Subsequent calls to load will replace the content of the same context.
             * Similar to `window.location.replace('URL');`  Calling this method will set the `#hidden` property to `false` and the `#attached` property to `true`.
             * The `#window` property will also change from `null` to a valid `window` object.
             *
             * @param {String} [URL] Specifies the URL of the page to open on the display.
             * @since 1.0
             */
            load(URL?: string): void;
            /**
             * Saves the contents of the current display as a PNG file.
             *
             *     var screenDumpFilePath = '/vol/save/common/some_file_name.png';
             *     var gamepadDisplay = nwf.display.DisplayManager.getInstance().getGamePadDisplay();
             *     gamepadDisplay.screenDump( screenDumpFilePath );
             *
             * __Note:__ The PNG file will not include Wii U system dialog boxes or animations created using `nwf.ui.Animation`.
             *
             * @param {String} filePath The path to the output file (PNG).
             * @since 1.0
             */
            screenDump(filePath: string): void;
            /**
             * Captures the display as and returns an {@link HTMLImageElement} object with the `callback`.
             *
             * You can configure the size of the resulting `Image` with the `options` parameter.
             * _The image will "stretch" to fill the size of the defined width and height._
             *
             *     var display = nwf.display.DisplayManager.getInstance().getGamePadDisplay();
             *     display.captureScreen( function( img ){
             *          // Attach img to the screen or draw to a canvas element...
             *     }, { width:854, height:480 });
             *
             * __Note:__ The {@link HTMLImageElement} will not include Wii U system dialog boxes or animations created using `nwf.ui.Animation`.
             *
             * @param {Function} callback Function to handle the generated `Image`.
             * @param {HTMLImageElement} callback.image `HTMLImageElement` passed to the callback function.
             * @param {Object} [options] Optional object to configure the screen capture.
             * @param {uint16} [options.width] Optional parameter to set the width of the returned `Image`. Default: Current `Display` width. Maximum value: 8196
             * @param {uint16} [options.height] Optional parameter to set the height of the returned `Image`. Default: Current `Display` height. Maximum value: 8196
             * @since 1.0
             * @async
             */
            captureScreen(callback: any, options?: any): void;
            /**
             * Sets the `#viewport` and `#bounds` of this display.
             * The viewport parameters define the area of the WebView that is shown on this display.
             * The bounds parameters define the area of this display that is drawn to.
             * Areas outside of the bounds are the color defined by `nwf.display.DisplayManager.backgroundColor`.
             * If the size of the viewport is different then the bounds, the output will be scaled to fit.
             * This method is only available when the display configuration is set to Shared WebView.
             *
             * @param {Number} [viewportX = 0] The X coordinate of the top left point in this display's viewport.
             * @param {Number} [viewportY = 0] The Y coordinate of the top left point in this display's viewport.
             * @param {Number} [viewportWidth = 854] The width of this display's viewport.
             * @param {Number} [viewportHeight = 480] The height of this display's viewport.
             * @param {Number} [boundsX = 0] The X coordinate of the top left point in this display's bounds.
             * @param {Number} [boundsY = 0] The Y coordinate of the top left point in this display's bounds.
             * @param {Number} [boundsWidth = 854] The width of this display's bounds.
             * @param {Number} [boundsHeight = 480] The height of this display's bounds.
             * @since 1.3
             */
            setViewport(viewportX?: number, viewportY?: number, viewportWidth?: number, viewportHeight?: number, boundsX?: number, boundsY?: number, boundsWidth?: number, boundsHeight?: number): void;
            /**
             * Sets the filtering method to use with #setViewport.
             * @param {String} filterType The filtering type to use.
             * @see nwf.display.ViewportFilter
             * @since 1.3
             */
            setViewportFilter(filterType: string): void;
            /**
             * Returns the `CanvasRenderingContext2D` associated with this display's WebView.
             * This allows for direct rendering into the WebView's backing store and removes an unnecessary copy for most canvas based games.
             *
             * When drawing to the returned context, all `clear` calls will clear to the color defined with the DisplayManager's `{@link nwf.display.DisplayManager#backgroundColor backgroundColor}`.
             *
             * Do not render directly to the display's WebView if DOM rendering is also used on the same display.
             * Doing so will cause undefined behavior.
             * Instead, all drawing should go directly to the returned context.
             * In addition, all other hidden canvas drawing should be drawn as an image with this context.
             * Rendering DOM elements into a different WebView, however, is fine.
             *
             * __Note:__ _The Web Inspector also renders directly to the WebView and can overwrite other calls.
             * Disabling the Web Inspector will stop this behavior and it will not occur on mastered images._
             * @returns {CanvasRenderingContext2D}
             * @since 1.5
             * @see nwf.display.GamePadDisplay.paintContext2D
             * @see nwf.display.TVDisplay.paintContext2D
             * @see nwf.display.DisplayManager.backgroundColor
             */
            getContext2D(): void;
            /**
             * Sets the entirety of the associated WebView page to dirty, causing a redraw.
             * This function must be called when drawing directly to the WebView context via `nwf.display.GamePadDisplay.getContext2D`.
             * @since 1.5
             * @see nwf.display.GamePadDisplay.getContext2D
             * @see nwf.display.TVDisplay.getContext2D
             */
            paintContext2D(): void;
            /**
             * Hides the contents of this display.
             * Calling `hide` will stop rendering objects to the attached screen and set the `#hidden` property to `true`.
             * All scripts, animations, and property access remain intact.
             * @since 1.0
             */
            hide(): void;
            /**
             * Shows the contents of this display.
             * Calling `show` will render objects to the attached screen and set the `#hidden` property to `false`.
             * @since 1.0
             */
            show(): void;
            /**
             * Adds an animation to the display. These animations exist outside of the normal web context and will persist even when a page change occurs. The `x` and `y` parameters will specify where the animation appears on the display. It will remain in that position regardless of any page changes or `DOM` reflows that occur. To change the position of the animation on screen, call `#translateAnimation`.
             *
             * The same `nwf.ui.Animation` object can be added to a display multiple times. Each one will be assigned a unique id that can be used to access that animation.
             *
             * @param {nwf.ui.Animation} animation The animation to add to the display.
             * @param {Number} x The `x` position of the animation on screen.
             * @param {Number} y The `y` position of the animation on screen.
             * @param {Number} [fadeIn=0] The number of frames to fade in the animation.
             * @returns {Number} A unique id for this animation.
             * @since 1.8.1
             */
            addAnimation(animation: any, x: number, y: number, fadeIn?: number): number;
            /**
             * Translates the position of the animation on screen.
             *
             * @param {Number} id The id of the animation to be moved.
             * @param {Number} x The new `x` position of the animation on screen.
             * @param {Number} y The new `y` position of the animation on screen.
             * @since 1.8.1
             */
            translateAnimation(id: any, x: number, y: number): void;
            /**
             * Remove the given animation from the display.
             *
             * @param {Number} id The `id` of the animation to be removed.
             * @param {Number} [fadeOut=0] The number of frames to fade out the animation.
             * @returns {Boolean} Returns `true` if the animation was successfully removed, or `false` otherwise.
             * @since 1.8.1
             */
            removeAnimation(id: number, fadeOut?: number): boolean;
            /**
             * Remove all animations currently on this display.
             *
             * @returns {Boolean} Returns `true` if the animations were successfully removed, or `false` otherwise.
             * @param {Number} [fadeOut=0] The number of frames to fade out the animations.
             * @since 1.8.1
             */
            removeAllAnimations(fadeOut?: number): boolean;
            private _fireReady(evt?);
            private _fireLoad(evt?);
            private _fireBoth(evt?);
            private _onPageLoaded(evt?);
        }
    }
}
declare module nwf {
    module display {
        class TVDisplay extends IDisplay {
            /**
             * Represents the display sent to the TV.
             *
             *     // Get instance
             *     var tvDisplay = nwf.display.DisplayManager.getInstance().getTVDisplay();
             *
             * The `TVDisplay` class dispatches the following events:
             *
             * - nwf.events.DisplayEvent.INITIALIZED
             * - nwf.events.DisplayEvent.LOAD
             * - nwf.events.DisplayEvent.READY
             * - nwf.events.DisplayEvent.UNINITIALIZED
             *
             * @class nwf.display.TVDisplay
             * @extends nwf.display.IDisplay
             * @author Ryan Lynd
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a `TVDisplay`; use `nwf.display.DisplayManager.getTVDisplay` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Unique ID of the display. Assigned by the system.
             * @property {int} [id=0]
             * @readonly
             * @since 1.0
             */
            id: number;
            /**
             * Display Type of the display.
             * @property {String} [type=nwf.display.DisplayType.TV]
             * @readonly
             * @since 1.0
             * @see nwf.display.DisplayType.GAMEPAD
             * @see nwf.display.DisplayType.TV
             * @see nwf.display.DisplayType.GENERIC
             * @see nwf.display.DisplayType.SHARED
             */
            type: string;
            /**
             * The size and location of the area on this display that is drawn to. In Shared WebView mode, this can be changed with the `#setViewport` method.
             * @property {Object} [bounds={x:0, y:0, width:1280, height:720}]
             * @readonly
             * @since 1.0
             */
            bounds: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            /**
             * The size and location of the area in the WebView that is displayed on this display. In Shared WebView mode, this can be changed with the `#setViewport` method, and the default is `{x:0, y:0, width:1280, height:720}`, or the same value as `nwf.display.TVDisplay#viewport`. This will make the displays mirror each other.
             * @property {Object} [viewport={x:0, y:0, width:1280, height:720}]
             * @readonly
             * @since 1.3
             */
            viewport: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            /**
             * The width of this display in pixels.
             * @property {int} [width=1280]
             * @readonly
             * @since 1.0
             */
            width: number;
            /**
             * The height of this display in pixels.
             * @property {int} [height=720]
             * @readonly
             * @since 1.0
             */
            height: number;
            /**
             * Reference to the top `HTML Window` object associated with this display.
             * Each display has one top window object. Scripts executing in the context of a display are scoped to this window object and/or its child frames.
             *
             * __Note:__ Will return `null` until the display has been loaded. The display will load if it is either set as a Start Page or if [nwf.display.TVDisplay.load](#!/api/nwf.display.TVDisplay-method-load) is executed.
             * @property {HTMLWindow} [window=null]
             * @readonly
             * @since 1.0
             */
            window: any;
        }
    }
}
declare module nwf {
    module display {
        class GamePadDisplay extends IDisplay {
            /**
             * Represents the display on the Wii U GamePad.
             *
             *     // Get instance
             *     var gamepadDisplay = nwf.display.DisplayManager.getInstance().getGamePadDisplay();
             *
             * The `GamePadDisplay` class dispatches the following events:
             *
             * - nwf.events.DisplayEvent.INITIALIZED
             * - nwf.events.DisplayEvent.LOAD
             * - nwf.events.DisplayEvent.READY
             * - nwf.events.DisplayEvent.UNINITIALIZED
             *
             * @class nwf.display.GamePadDisplay
             * @extends nwf.display.IDisplay
             * @author Ryan Lynd
             */
            /**
             * @private
             * The `new` method is not used to get an instance of `GamePadDisplay`; use `nwf.display.DisplayManager.getGamePadDisplay` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Unique ID of the display. Assigned by the system.
             * @property {int} [id=1]
             * @readonly
             * @since 1.0
             */
            id: number;
            /**
             * Display Type of the display.
             * @property {String} [type=nwf.display.DisplayType.GAMEPAD]
             * @readonly
             * @since 1.0
             * @see nwf.display.DisplayType.GAMEPAD
             * @see nwf.display.DisplayType.TV
             * @see nwf.display.DisplayType.GENERIC
             * @see nwf.display.DisplayType.SHARED
             */
            type: string;
            /**
             * Reference to the top `HTML Window` object associated with this display.
             * Each display has one top window object. Scripts executing in the context of a display are scoped to this window object and/or its child frames.
             *
             * __Note:__ Will return `null` until the display has been loaded. The display will load if it is either set as a Start Page or if [nwf.display.GamePadDisplay.load](#!/api/nwf.display.GamePadDisplay-method-load) is executed.
             * @property {HTMLWindow} [window=null]
             * @readonly
             * @since 1.0
             */
            window: any;
        }
    }
}
declare module nwf {
    module events {
        class DisplayEvent extends Event {
            /**
             * Defines events dispatched by the `TVDisplay` and `GamePadDisplay` classes.
             *
             * @see {@link nwf.display.TVDisplay}
             * @see {@link nwf.display.GamePadDisplay}
             * @class nwf.events.DisplayEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the display is uninitialized by a request to load a new page on the top context of the display.
             * @property {string} [UNINITIALIZED='uninitialized']
             * @static @constant
             * @since 1.0
             */
            UNINITIALIZED: string;
            static UNINITIALIZED: string;
            /**
             * Dispatched when the display is initialized and loading.
             *
             * @property {string} [INITIALIZED='initialized']
             * @static @constant
             * @since 1.0
             */
            INITIALIZED: string;
            static INITIALIZED: string;
            /**
             * Dispatched when the user can interact with the display even though it is not fully loaded.
             *
             * This is similar in function to the [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/DOMContentLoaded) Event.
             *
             * @property {string} [READY='ready']
             * @static @constant
             * @since 1.0
             */
            READY: string;
            static READY: string;
            /**
             * Dispatched when the display is completely loaded and all assets are downloaded.
             *
             * This is similar in function to the [`load`](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/load) Event.
             *
             * @property {string} [LOAD='load']
             * @static @constant
             * @since 1.0
             */
            LOAD: string;
            static LOAD: string;
        }
    }
}
declare module nwf {
    module display {
        /**
         * AspectRatio constants.
         * @enum nwf.display.AspectRatio
         * @author Ryan Lynd
         */
        var AspectRatio: {
            STANDARD_4X3: string;
            WIDE_16X9: string;
        };
    }
}
declare module nwf {
    module display {
        /**
         * DisplayType constants.
         * @enum nwf.display.DisplayType
         * @author Ryan Lynd
         */
        var DisplayType: {
            TV: string;
            GAMEPAD: string;
            GENERIC: string;
            SHARED: string;
        };
    }
}
declare module nwf {
    module display {
        /**
         * ViewportFilter constants.
         * @enum nwf.display.ViewportFilter
         * @author Ryan Lynd
         */
        var ViewportFilter: {
            POINT: string;
            BILINEAR: string;
        };
    }
}
declare module nwf {
    module display {
        class DisplayManager {
            /**
             * Class for providing access to available displays.
             * With the `DisplayManager` singleton you can access and draw content on any attached display using the APIs available on the accessed `Display` class.
             *
             *      // Get instance
             *      var displayManager = nwf.display.DisplayManager.getInstance();
             *
             * @class nwf.display.DisplayManager
             * @author Ryan Lynd
             * @author Shawn Gates
             * @singleton
             */
            /**
             * @private
             * The `new` method is not used to get an instance of `DisplayManager`; use `#getInstance` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * The background color of the display.
             * This color appears behind the WebView(s) on the display.
             * The default value for this property is set in Project Settings on the Display page.
             *
             * Acceptable values are:
             *
             * - A CSS color string - "blue"
             * - 3-character hash notation - "#00F"
             * - 6-character hash notation - "#0000FF"
             * - Function notation - "rgb(0,0,255)"
             *
             * __Note:__ _This will not change the CSS defined background color of the page._
             *
             * @see nwf.display.TVDisplay.getContext2D
             * @see nwf.display.GamePadDisplay.getContext2D
             * @property {String} [backgroundColor='#000000']
             * @since 1.6
             */
            backgroundColor: string;
            /**
             * Returns a reference to the `TVDisplay` or `GamePadDisplay` object based on the Display ID parameter. If nothing is passed in, the `TVDisplay` will be returned.
             *
             *      var manager = nwf.display.DisplayManager.getInstance();
             *
             *      // The Display object associated with this WebView
             *      var displayID = manager.getThisDisplayID();
             *
             *      var display = manager.getDisplayByID(displayID);
             *
             * @see {@link nwf.display.TVDisplay}
             * @see {@link nwf.display.GamePadDisplay}
             * @param {Number} [displayID=0] Index of the attached Display.
             * @returns {nwf.display.IDisplay|null} Reference to the <code>TVDisplay</code> or <code>GamePadDisplay</code> object. `null` if display object is not found, usually if index is out of range.
             * @since 1.0
             */
            getDisplayByID(displayID?: number): nwf.display.IDisplay;
            /**
             * Returns a reference to the `TVDisplay` object. Use this method to access and change properties and methods available on the TV display.
             * Use this method to access and change properties and methods available on the TV screen, including the `HTML Window` object associated with this display.
             *
             * __Developer Tip:__ _The recommended practice is to load the TV page in JavaScript and control that context from within the GamePad context. This has resulted in simplified architecture._
             *
             *      var tvDisplay = nwf.display.DisplayManager.getInstance().getTVDisplay();
             *      // Be sure to actually have an HTML file in the same directory; for now, assume this exists
             *      tvDisplay.load( 'tv.html' );
             *      // Alternativly, calling `tvDisplay.load` with an empty string will load a blank HTML page that can then have elements added to it
             *
             *      // Wait for the TV DOM to load
             *      var tvWin = tvDisplay.window;
             *
             *      // It could be that this page is reloading, so for that case (and all others), go through the `loadLoop` below
             *      var oldDoc = tvWin.document;
             *
             *      // Set a tight loop for the load listener as a workaround for a WebKit bug
             *      var loadLoop = setInterval( function() {
             *          // If the new document hasn't launched, then return and keep trying/looping
             *          if (oldDoc === tvWin.document || tvWin.document.readyState === 'uninitialized') return;
             *          if (tvWin.document.readyState === 'loading') {
             *              // Add the listener here, specifically
             *              tvWin.addEventListener( 'DOMContentLoaded', tvOnLoad, false );
             *          } else if (tvWin.document.readyState === 'interactive' || tvWin.document.readyState === 'complete') {
             *              // If this already ran through the listener (these conditions were met) then launch it
             *              tvOnLoad();
             *          }
             *          clearInterval( loadLoop );
             *      }, 16);
             *
             *      var tvOnLoad = function() {
             *          tvWin.removeEventListener( 'DOMContentLoaded', tvOnLoad );
             *
             *          // Now we can be sure the document is ready and safe to use
             *          var tvDoc = tvWin.document;
             *          var newGamePadDiv = tvDoc.createElement( "div" );
             *          newGamePadDiv.innerHTML = "<h1>Hello Wii U!</h1>";
             *          tvDoc.body.appendChild( newTVDiv );
             *      }
             *
             * It is not necessary to use this function to display anything on the the display the code is being executed from. For example, <code>tvDisplay.window.document</code> is the exact same <code>document</code> object as the one developers call in JavaScript by simply typing <code>document</code> on the page loaded to the TV.
             * @see {@link nwf.display.TVDisplay}
             * @returns {nwf.display.TVDisplay} Reference to the <code>TVDisplay</code> object.
             * @since 1.0
             */
            getTVDisplay(): nwf.display.TVDisplay;
            /**
             * Returns a reference to the `GamePadDisplay` object.
             * Use this method to access and change properties and methods available on the GamePad screen, including the `HTML Window` object associated with this display.
             *
             * __Developer Tip:__ _The recommended practice is to load the TV page in JavaScript and control that context from within the GamePad context. This has resulted in simplified architecture._
             *
             *      var gpDisplay = nwf.display.DisplayManager.getInstance().getGamePadDisplay();
             *
             *      // Be sure to actually have an HTML file in the same directory; for now, assume this exists
             *      gpDisplay.load( 'gp.html' );
             *      // Alternatively, calling `gpDisplay.load` with an empty string will load a blank HTML page that can then have elements added to it
             *
             *      // Wait for the GamePad DOM to load; it lags behind the TV DOM a bit
             *      var gpWin = gpDisplay.window;
             *
             *      // It could be that this page is reloading, so for that case (and all others), go through the `loadLoop` below
             *      var oldDoc = gpWin.document;
             *
             *      // Set a tight loop for the load listener as a workaround for a WebKit bug
             *      var loadLoop = setInterval( function() {
             *          // If the new document hasn't launched, then return and keep trying/looping
             *          if (oldDoc === `gpWin.document` || gpWin.document.readyState === 'uninitialized') return;
             *          if (gpWin.document.readyState === 'loading') {
             *              // Add the listener here, specifically
             *              gpWin.addEventListener( 'DOMContentLoaded', gpOnLoad, false );
             *          } else if (gpWin.document.readyState === 'interactive' || gpWin.document.readyState === 'complete') {
             *              // If this already ran through the listener (these conditions were met) then launch it
             *              gpOnLoad();
             *          }
             *          clearInterval( loadLoop );
             *      }, 16);
             *
             *      var gpOnLoad = function() {
             *          gpWin.removeEventListener( 'DOMContentLoaded', gpOnLoad );
             *
             *          // Now we can be sure the document is ready and safe to use
             *          var gpDoc = gpWin.document;
             *          var newGamePadDiv = gpDoc.createElement( "div" );
             *          `newGamePadDiv.innerHTML` = "<h1>Hello Wii U!</h1>";
             *          gpDoc.body.appendChild( newGamePadDiv );
             *      };
             *
             * It is not necessary to use this function to display anything on the the display the code is being executed from. For example, `gpDisplay.window.document` is the exact same `document` object as the one developers call in JavaScript by simply typing `document` on the page loaded to the GamePad.
             *
             * @returns {nwf.display.GamePadDisplay} Reference to the `GamePadDisplay` object.
             * @see {@link nwf.display.TVDisplay}
             * @since 1.0
             */
            getGamePadDisplay(): nwf.display.GamePadDisplay;
            /**
             * Returns `true` if the display is currently attached, given the ID of the display.
             *
             *      var dm = nwf.display.DisplayManager.getInstance();
             *      var tvDisplay = dm.getTVDisplay();
             *      console.log( "Is the TV display attached? " + dm.isDisplayAttached( tvDisplay.id ) );
             *
             *  Alternatively, it's possible to query the display (TV or GamePad) directly this way:
             *
             *      if (tvDisplay.attached) { ... }
             *
             * @param {Number} displayID ID of the display to test.
             * @returns {Boolean} Returns `true` if the display is attached, or `false` if not.
             * @since 1.0
             */
            isDisplayAttached(displayID: number): boolean;
            /**
             * Returns the ID of the display attached to the executing WebView. Useful for determining the context of your JavaScript code.
             *
             *      var manager = nwf.display.DisplayManager.getInstance();
             *      var displayID = manager.getThisDisplayID();
             *      switch( displayID ){
             *          case 0:
             *             // JavaScript is executing on the TV
             *             break;
             *          case 1:
             *             // JavaScript is executing on the GamePad
             *             break;
             *      }
             *
             *      // The Display object associated with this WebView
             *      var display = manager.getDisplayByID( displayID );
             *
             * @returns {int} Unique ID of the display attached to the executing WebView.
             * @since 1.0
             */
            getThisDisplayID(): boolean;
            /**
             * Accesses an instance of the `DisplayManager` singleton.
             * @method getInstance
             * @returns {nwf.display.DisplayManager} The `DisplayManager` singleton instance.
             * @since 1.0
             * @static
             */
            static getInstance(): nwf.display.DisplayManager;
            /**
             * Tests for class availability.
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
            */
            static isSupported(): boolean;
        }
    }
}
declare module nwf {
    module ec {
        class Item {
            /**
             * Class containing the structure of an `Item` from the Nintendo eShop.
             *
             * @class nwf.ec.Item
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new `nwf.ec.Item` object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
            /**
             * The description of the content of the `Item`.
             * @property {String} [description='']
             * @readonly
             * @since 1.8.1
             */
            description: string;
            /**
             * The title of the content.
             * @property {String} [name='']
             * @readonly
             * @since 1.8.1
             */
            name: string;
            /**
             * The image icon representing the content.
             * This will return `null` until `#downloadIcon` is called.
             * @property {HTMLImageElement} [icon=new Image]
             * @readonly
             * @since 1.8.1
             */
            icon: HTMLImageElement;
            /**
             * An `Array` of images previewing the content.
             * There are up to eight promotional images for each `Item`.
             * Each slot's image must be downloaded separately using `#downloadPromoImages` to fill out the `Array`.
             * Any index in the `Array` that has not been downloaded will return `undefined` when accessed.
             * @property {Array} [promoImages=new Array]
             * @readonly
             * @since 1.8.1
             */
            promoImages: any[];
            /**
             * Date the content was released.
             * @property {Date} [releaseDate=new Date]
             * @readonly
             * @since 1.8.1
             */
            releaseDate: Date;
            /**
             * The price of the content.
             * This will be `undefined` if `#isPurchased` is set to true.
             * @property {nwf.ec.Price} price
             * @readonly
             * @since 1.8.1
             */
            price: Price;
            /**
             * The ID of the content.
             * This is a string representing a 64-bit value.
             * Each `Item`, as specified by this `id`, can only be purchased or added to an `nwf.ec.DownloadCart` or `nwf.ec.PurchaseCart` once.
             * @property {String} [id='']
             * @readonly
             * @since 1.8.1
             */
            id: string;
            /**
             * Indicates download status of the content.
             * @property {Number} [downloadStatus=nwf.ec.DownloadStatus.NONE]
             * @see nwf.ec.DownloadStatus
             * @readonly
             * @since 1.8.1
             */
            downloadStatus: number;
            /**
             * Indicates sales status of the content.
             * @property {Number} [salesStatus=nwf.ec.SalesStatus.UNKNOWN]
             * @see nwf.ec.SalesStatus
             * @readonly
             * @since 1.8.1
             */
            salesStatus: number;
            /**
             * Indicates if the content has been purchased by the user.
             * `Items` that have been purchased may not be purchased again but they can be re-downloaded.
             * @property {Boolean} [isPurchased=false]
             * @readonly
             * @since 1.8.1
             */
            isPurchased: boolean;
            /**
             * Downloads the icon for the content.
             * @param {Function} callback Function to call when the download has completed.
             * @param {Object} callback.event An `Event` object containing information about the download process.
             * @param {String} callback.event.type Describes the type and status of download.
             * @param {Number} callback.event.errorCode The status of the operation. This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @async
             * @since 1.8.1
             */
            downloadIcon(callback: any): void;
            /**
             * Download the indicated promotional image.
             * @param {Function} callback Function to call when the download has completed.
             * @param {Object} callback.event An `Event` object containing information about the download process.
             * @param {String} callback.event.type Describes the type and status of download.
             * @param {Number} callback.event.errorCode The status of the operation. This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @param {Number} slot The target promotional image to be downloaded. The valid range for `slot` is between `1` and `8` and will correspond to the `slot-1` index of `#promoImages`.
             * @async
             * @since 1.8.1
             */
            downloadPromoImages(callback: any, slot: number): void;
        }
    }
}
declare module nwf {
    module ec {
        class Money {
            /**
             * Class containing the structure of a `Money` object for use with E-Commerce.
             *
             * @class nwf.ec.Money
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new `Money` object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
            /**
             * The amount of money represented by a formatted string.
             * @property {String} [amount='##########.##']
             * @readonly
             * @since 1.8.1
             */
            amount: string;
            /**
             * The currency of the money.
             * @property {String} [currency='']
             * @readonly
             * @since 1.8.1
             */
            currency: string;
            /**
             * The amount of money.
             * @property {Number} [value=0]
             * @readonly
             * @since 1.8.1
             */
            value: number;
            /**
             * Indicates if the object is valid.
             * @property {Boolean} [isValid=false]
             * @since 1.8.1
             */
            isValid: boolean;
        }
    }
}
declare module nwf {
    module ec {
        class Price {
            /**
             * Class containing the structure of eShop item prices.
             *
             * @class nwf.ec.Price
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new Price object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
            /**
             * Description of the sale.
             * @property {String} [discountDescription='']
             * @readonly
             * @since 1.8.1
             */
            discountDescription: string;
            /**
             * The regular price.
             * @property {nwf.ec.Money} [regularPrice=new nwf.ec.Money]
             * @readonly
             * @since 1.8.1
             */
            regularPrice: Money;
            /**
             * The discounted price.
             * @property {nwf.ec.Money} [salesPrice=new nwf.ec.Money]
             * @readonly
             * @since 1.8.1
             */
            salesPrice: Money;
        }
    }
}
declare module nwf {
    module ec {
        class ICart {
            /**
             * `ICarts` are passed into the `nwf.ec.ECommerce.launchCartView` method to launch the `EC Applet` with a set of `{@link nwf.ec.Item Items}` to be downloaded or purchased.
             * The `ICart` class is not used directly; either an `nwf.ec.DownloadCart` or an `nwf.ec.PurchaseCart` is used.
             *
             * @class nwf.ec.ICart
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * `ICarts` are not created directly.
             * Instead create an `nwf.ec.PurchaseCart` or `nwf.ec.DownloadCart`.
             * @method constructor
             * @private
             * @since 1.8.1
             */
            constructor();
            /**
             * The number of `{@link nwf.ec.Item Items}` contained in the object.
             * @property {Number} [count=0]
             * @readonly
             * @since 1.8.1
             */
            count: number;
            /**
             * The total cost of all `{@link nwf.ec.Item Items}` in the cart.
             * @property {nwf.ec.Money} [total=new nwf.ec.Money]
             * @readonly
             * @since 1.8.1
             */
            total: Money;
            /**
             * Indicates which kind of cart this object is.
             * If this is `true`, the object is an `nwf.ec.PurchaseCart`.
             * If `false`, the object is an `nwf.ec.DownloadCart`.
             * @property {Boolean} [isPurchased]
             * @readonly
             * @since 1.8.1
             */
            isPurchased: boolean;
            /**
             * Clears the `{@link nwf.ec.Item Items}` previously added.
             * @since 1.8.1
             */
            clear(): void;
            /**
             * Gets an `{@link nwf.ec.Item Item}`.
             * This will return `undefined` until `{@link nwf.ec.Item Items}` are added with the `#add` method.
             * @param {Number} index The index of the `{@link nwf.ec.Item Item}` in the catalog.
             * @returns {nwf.ec.Item} The requested `{@link nwf.ec.Item Item}`.
             *          This will return `undefined` until `{@link nwf.ec.Item Items}` are added with the `#add` method.
             * @since 1.8.1
             */
            get(index: number): nwf.ec.Item;
            /**
             * Adds an `{@link nwf.ec.Item Item}`.
             * @param {nwf.ec.Item} item The `{@link nwf.ec.Item Item}` to add.
             * @since 1.8.1
             */
            add(item: nwf.ec.Item): void;
            /**
             * Removes an `{@link nwf.ec.Item Item}`.
             * @param {nwf.ec.Item} item The `{@link nwf.ec.Item Item}` to remove.
             * @since 1.8.1
             */
            remove(item: nwf.ec.Item): void;
        }
    }
}
declare module nwf {
    module ec {
        class PurchaseCart extends ICart {
            /**
             * This class implements the `nwf.ec.ICart` interface class.
             *
             * @class nwf.ec.PurchaseCart
             * @extends nwf.ec.ICart
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new `nwf.ec.PurchaseCart`.
             * @method constructor
             *
             * @since 1.8.1
             */
            constructor();
        }
    }
}
declare module nwf {
    module ec {
        class DownloadCart extends ICart {
            /**
             * This class implements the `nwf.ec.ICart` interface class.
             *
             * @class nwf.ec.DownloadCart
             * @extends nwf.ec.ICart
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new `nwf.ec.DownloadCart`.
             * @method constructor
             *
             * @since 1.8.1
             */
            constructor();
        }
    }
}
declare module nwf {
    module ec {
        class ICatalog {
            /**
             * Catalogs are used to download and retrieve E-Commerce items that are tied to the application.
             * The `ICatalog` class is not used directly; either a `nwf.ec.DownloadCatalog` or `nwf.ec.PurchaseCatalog` is used.
             * The `nwf.ec.ECommerce` methods `{@link nwf.ec.ECommerce#getDownloadCatalog getDownloadCatalog}` and `{@link nwf.ec.ECommerce#getPurchaseCatalog getPurchaseCatalog}` methods are used to get instances of the each respectively.
             *
             * @class nwf.ec.ICatalog
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new ICatalog object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
            /**
             * The number of `{@link nwf.ec.Item Items}` contained in the object.
             * This will be `0` until `{@link nwf.ec.Item Items}` are retrieved with the `#download` method.
             * @property {Number} [count=0]
             * @readonly
             * @since 1.8.1
             */
            count: number;
            /**
             * The total number of `{@link nwf.ec.Item Items}` that exist on the server.
             * This will be `0` until `{@link nwf.ec.Item Items}` are retrieved with the `#download` method.
             * @property {Number} [total=0]
             * @readonly
             * @since 1.8.1
             */
            total: number;
            /**
             * Indicates which kind of catalog this object is.
             * If this is `true`, the object is an `nwf.ec.DownloadCatalog`.
             * If `false`, the object is an `nwf.ec.PurchaseCatalog`.
             * @property {Boolean} [isPurchased]
             * @readonly
             * @since 1.8.1
             */
            isPurchased: boolean;
            /**
             * Clears the item data previously downloaded.
             * @since 1.8.1
             */
            clear(): void;
            /**
             * Retrieves a number of items for the catalog that can be purchased.
             * This function calls `#clear` before starting.
             * @param {Number} start The index to start downloading from.
             * @param {Number} count The number of items to attempt downloading.
             * @since 1.8.1
             * @see nwf.ec.ECommerce.RETRIEVE_NUM_MAX
             * @see nwf.events.ECommerceEvent.CATALOG_DOWNLOAD_SUCCESS
             * @see nwf.events.ECommerceEvent.CATALOG_DOWNLOAD_FAILED
             * @async
             */
            download(start: number, count: number): void;
            /**
             * Gets an `{@link nwf.ec.Item Item}` from the catalog.
             * @param {Number} index The index of the `{@link nwf.ec.Item Item}` in the catalog.
             * @returns {nwf.ec.Item} The requested `{@link nwf.ec.Item Item}`.
             *          Will return `undefined` until `{@link nwf.ec.Item Items}` are retrieved with the `#download` method.
             * @since 1.8.1
             */
            get(index: number): nwf.ec.Item;
        }
    }
}
declare module nwf {
    module ec {
        class PurchaseCatalog extends ICatalog {
            /**
             * This class implements the `nwf.ec.ICatalog` interface class.
             *
             * @class nwf.ec.PurchaseCatalog
             * @extends nwf.ec.ICatalog
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new PurchaseCatalog object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
        }
    }
}
declare module nwf {
    module ec {
        class DownloadCatalog extends ICatalog {
            /**
             * This class implements the `nwf.ec.ICatalog` interface class.
             *
             * @class nwf.ec.DownloadCatalog
             * @extends nwf.ec.ICatalog
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * Creates a new DownloadCatalog object.
             * @method constructor
             * @since 1.8.1
             * @ignore
             */
            constructor();
        }
    }
}
declare module nwf {
    module ec {
        /**
         * `DownloadStatus` constants for `ECommerce`.
         *
         * @enum nwf.ec.DownloadStatus
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var DownloadStatus: {
            NONE: number;
            WAITING: number;
            DOWNLOADING: number;
            COMPLETED: number;
            FAILED: number;
        };
    }
}
declare module nwf {
    module ec {
        /**
         * `SalesStatus` constants for `ECommerce`.
         *
         * @enum nwf.ec.SalesStatus
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var SalesStatus: {
            UNKNOWN: number;
            UNRELEASED: number;
            ONSALE: number;
            SALES_TERMINATION: number;
            DOWNLOAD_TERMINATION: number;
        };
    }
}
declare module nwf {
    module events {
        class ECommerceEvent extends Event {
            /**
             * Events dispatched by the `ECommerce` class.
             *
             * @class nwf.events.ECommerceEvent
             * @see {@link nwf.ec.ECommerce}
             * @extends nwf.events.Event
             * @author Aaron Ward
             */
            constructor();
            /**
             * The `nwf.ec.Money` object returned from the server after a successful login or transaction.
             * When `nwf.events.ECommerceEvent.GET_BALANCE_SUCCESS` is dispatched, this represents the amount in the user's wallet.
             * @property {nwf.ec.Money} [balance=new nwf.ec.Money]
             * @readonly
             * @since 1.8.1
             */
            balance: ec.Money;
            /**
             * Error code that is set on a fail event.
             * Helps tie the failed event to a `{@link nwf.events.SystemErrorEvent}`.
             *
             * @property {Number} [errorCode=null]
             * @readonly
             * @since 1.8.1
             * @see nwf.system.SystemErrorCode
             */
            errorCode: any;
            /**
             * Dispatched when a call made to `nwf.ec.ECommerce.login` is successful.
             * @property {String} [LOGIN_SUCCESS='ecdkLoginSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static LOGIN_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.ec.ECommerce.login` fails.
             * @property {String} [LOGIN_FAILED='ecdkLoginFailed']
             * @static @constant
             * @since 1.8.1
             */
            static LOGIN_FAILED: string;
            /**
             * Dispatched when a call made to `nwf.ec.ECommerce.logout` is successful.
             * @property {String} [LOGOUT_SUCCESS='ecdkLogoutSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static LOGOUT_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.ec.ECommerce.logout` fails.
             * @property {String} [LOGOUT_FAILED='ecdkLogoutFailed']
             * @static @constant
             * @since 1.8.1
             */
            static LOGOUT_FAILED: string;
            /**
             * Dispatched when an attempt to update the user's balance is successful.
             * @property {String} [GET_BALANCE_SUCCESS='ecdkGetBalanceSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static GET_BALANCE_SUCCESS: string;
            /**
             * Dispatched when an attempt to update the user's balance fails.
             * @property {String} [GET_BALANCE_FAILED='ecdkGetBalanceFailed']
             * @static @constant
             * @since 1.8.1
             */
            static GET_BALANCE_FAILED: string;
            /**
             * Dispatched when an attempt to synchronize the user's rights is successful.
             * @property {String} [SYNCHRONIZE_RIGHTS_SUCCESS='ecdkSyncRightsSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static SYNCHRONIZE_RIGHTS_SUCCESS: string;
            /**
             * Dispatched when an attempt to synchronize the user's rights fails.
             * @property {String} [SYNCHRONIZE_RIGHTS_FAILED='ecdkSyncRightsFailed']
             * @static @constant
             * @since 1.8.1
             */
            static SYNCHRONIZE_RIGHTS_FAILED: string;
            /**
             * Dispatched when an attempt to download a catalog is successful.
             * @property {String} [CATALOG_DOWNLOAD_SUCCESS='ecdkCatalogDownloadSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static CATALOG_DOWNLOAD_SUCCESS: string;
            /**
             * Dispatched when an attempt to download a catalog fails.
             * @property {String} [CATALOG_DOWNLOAD_FAILED='ecdkCatalogDownloadFailed']
             * @static @constant
             * @since 1.8.1
             */
            static CATALOG_DOWNLOAD_FAILED: string;
        }
    }
}
declare module nwf {
    module ec {
        class ECommerce extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the EC Applet and eShop Server.
             * The static class can be used to launch the EC Applet, while the singleton is used to communicate with the eShop Server.
             * You must `#login` to the eShop Server before using any other `ECommerce` features.
             *
             * When logging in to the eShop Server and anytime content is purchased or the balance is changed, the system will automatically synchronize the account information with the server.
             * When this process has finished, a `nwf.events.ECommerceEvent.SYNCHRONIZE_RIGHTS_SUCCESS` event and a `nwf.events.ECommerceEvent.GET_BALANCE_SUCCESS` event will be fired.
             * Be sure that these have both finished before attempting to perform any actions that would trigger them again.
             *
             * __Note:__ The E-Commerce feature must be enabled in the Features page and the Network Access setting in Platform Features - Network page of Project Settings must NOT be set to disabled for the feature to work and for `nwf.ec` to be defined.
             *
             * The `ECommerce` class dispatches the following events:
             *
             * - nwf.events.ECommerceEvent.LOGIN_FAILED
             * - nwf.events.ECommerceEvent.LOGIN_SUCCESS
             * - nwf.events.ECommerceEvent.LOGOUT_SUCCESS
             * - nwf.events.ECommerceEvent.LOGOUT_FAILED
             * - nwf.events.ECommerceEvent.GET_BALANCE_SUCCESS
             * - nwf.events.ECommerceEvent.GET_BALANCE_FAILED
             * - nwf.events.ECommerceEvent.SYNCHRONIZE_RIGHTS_SUCCESS
             * - nwf.events.ECommerceEvent.SYNCHRONIZE_RIGHTS_FAILED
             * - nwf.events.ECommerceEvent.CATALOG_DOWNLOAD_SUCCESS
             * - nwf.events.ECommerceEvent.CATALOG_DOWNLOAD_FAILED
             *
             * @class nwf.ec.ECommerce
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Aaron Ward
             * @author Nate Long
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of an `ECommerce` object; use `#getInstance` instead.
             * @method constructor
             * @since 1.8.1
             */
            constructor();
            /**
             * Logs into the eShop Server.
             *
             * @since 1.8.1
             * @see nwf.events.ECommerceEvent.LOGIN_SUCCESS
             * @see nwf.events.ECommerceEvent.LOGIN_FAILED
             * @async
             */
            login(): void;
            /**
             * Logs out from the eShop Server.
             *
             * @since 1.8.1
             * @see nwf.events.ECommerceEvent.LOGOUT_SUCCESS
             * @see nwf.events.ECommerceEvent.LOGOUT_FAILED
             * @async
             */
            logout(): void;
            /**
             * Returns the `{@link nwf.ec.DownloadCatalog DownloadCatalog}` associated with this application.
             *
             * @returns {nwf.ec.DownloadCatalog} The `{@link nwf.ec.DownloadCatalog DownloadCatalog}` associated with this title.
             * @since 1.8.1
             */
            getDownloadCatalog(): any;
            /**
             * Returns the `{@link nwf.ec.PurchaseCatalog PurchaseCatalog}` associated with this application.
             *
             * @returns {nwf.ec.PurchaseCatalog} The `{@link nwf.ec.PurchaseCatalog PurchaseCatalog}` associated with this title.
             * @since 1.8.1
             */
            getPurchaseCatalog(): any;
            /**
             * Launch the EC Applet to purchase or download the provided `Item`.
             *
             * @static
             * @param {Function} callback Function to call when the user returns from the EC Applet.
             * @param {Object} callback.event An `Event` object containing information about the EC Applet.
             * @param {String} callback.event.type The mode the EC Applet was in when it was closed.
             * @param {Number} callback.event.errorCode The status of the operation.
             *                 This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @param {nwf.ec.Item} item The `nwf.ec.Item` to be purchased or downloaded.
             * @async
             * @since 1.8.1
             */
            launchItemView(callback: any, item: nwf.ec.Item): void;
            /**
             * Launch the EC Applet to purchase or download the provided `ICart`.
             *
             * @static
             * @param {Function} callback Function to call when the user returns from the EC Applet.
             * @param {Object} callback.event An `Event` object containing information about the EC Applet.
             * @param {String} callback.event.type The mode the EC Applet was in when it was closed.
             * @param {Number} callback.event.errorCode The status of the operation.
             *                 This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @param {nwf.ec.ICart} cart The `nwf.ec.ICart` to be purchased or downloaded.
             * @async
             * @since 1.8.1
             */
            launchCartView(callback: any, target: any): void;
            /**
             * Launch the EC Applet to use a redemption code.
             *
             * @static
             * @param {Function} callback Function to call when the user returns from the EC Applet.
             * @param {Object} callback.event An `Event` object containing information about the EC Applet.
             * @param {String} callback.event.type The mode the EC Applet was in when it was closed.
             * @param {Number} callback.event.errorCode The status of the operation.
             *                 This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @async
             * @since 1.8.1
             */
            launchRedeem(callback: any): void;
            /**
             * Launch the EC Applet to manage the user's wallet.
             *
             * @static
             * @param {Function} callback Function to call when the user returns from the EC Applet.
             * @param {Object} callback.event An `Event` object containing information about the EC Applet.
             * @param {String} callback.event.type The mode the EC Applet was in when it was closed.
             * @param {Number} callback.event.errorCode The status of the operation.
             *                 This will be set to `0` on a success, `1` if the operation was canceled, or an error code from `nwf.system.SystemErrorCode`.
             * @param {Number} callback.event.timestamp The number of milliseconds (with microsecond precision) at the time of the event since the runtime was initialized.
             * @param {Object} callback.event.target Indicates the `EventTarget` to which the event was originally dispatched.
             * @async
             * @since 1.8.1
             */
            launchBalanceManager(callback: any): void;
            /**
             * Accesses an instance of the `ECommerce` singleton.
             *
             * @method getInstance
             * @returns {nwf.ec.ECommerce} The `ECommerce` singleton instance.
             * @since 1.8.1
             * @static
             */
            static getInstance(): typeof ECommerce;
            /**
             * The maximum number of items that can be retrieved in one operation.
             * @property {Number} RETRIEVE_NUM_MAX=100
             * @static @readonly
             * @since 1.8.1
             */
            static RETRIEVE_NUM_MAX: number;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    module fp {
        /**
         * Class containing the structure of `Presence` data.
         *
         * @class nwf.fp.PresenceData
         * @author Ryan Lynd
         */
        class PresenceData {
            /**
             * Represents a principal ID.
             * @property {Number} [principalID=0]
             * @readonly
             * @since 1.0
             */
            principalID: number;
            /**
             * Represents an account ID.
             * @property {String} [accountID='']
             * @readonly
             * @since 1.0
             */
            accountID: string;
            /**
             * The display name.
             * @property {String} [screenName=0]
             * @readonly
             * @since 1.0
             */
            screenName: number;
            /**
             * Area code.
             * @property {Number} [area=0]
             * @readonly
             * @since 1.0
             */
            area: number;
            /**
             * Country code.
             * @property {Number} [country=0]
             * @readonly
             * @since 1.0
             */
            country: number;
            /**
             * The console's language code.
             * @property {Number} [language=0]
             * @readonly
             * @since 1.0
             */
            language: number;
            /**
             * The region code of the console.
             * @property {Number} [region=0]
             * @readonly
             * @since 1.0
             */
            region: number;
            /**
             * Returns `true` when the friend is on-line, or `false` otherwise.
             * @property {Boolean} [isOnline=0]
             * @readonly
             * @since 1.0
             */
            isOnline: boolean;
        }
    }
}
declare module nwf {
    module events {
        class FriendPresenceEvent extends Event {
            /**
             * Events dispatched by the `FriendPresence` class.
             *
             * @see {@link nwf.fp.FriendPresence}
             * @class nwf.events.FriendPresenceEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
                 * The list of friends' principal IDs returned from the server. Even on failure, it will return an array (an empty one, specifically). Use the principal IDs to fetch Presence Data for each friend with `nwf.fp.FriendPresence.getPresenceData`.
                 * Only set when `#FRIEND_LIST_SUCCESS` is dispatched.
                 * __Note:__ If the user has no friends this will be a zero-length array.
                 * @see {@link nwf.fp.FriendPresence}
                 * @property {Array} [friendList=[]]
                 * @readonly
                 * @since 1.0
                 */
            friendList: any[];
            /**
             * The presence data of a friend.
             * Only set when `#PRESENCE_DATA_SUCCESS` is dispatched.
             * @property {nwf.fp.PresenceData} [presenceData=null]
             * @readonly
             * @since 1.0
             */
            presenceData: void;
            /**
             * Dispatched when a call made to {@link nwf.fp.FriendPresence#getFriendList getFriendList} of the {@link nwf.fp.FriendPresence FriendPresence} class is successful.
             * @property {string} [FRIEND_LIST_SUCCESS='friendListSuccess']
             * @static @constant
             * @since 1.0
             */
            static FRIEND_LIST_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.fp.FriendPresence#getFriendList getFriendList} of the {@link nwf.fp.FriendPresence FriendPresence} class failed.
             * @property {string} [FRIEND_LIST_FAIL='friendListFail']
             * @since 1.0
             * @static @constant
             */
            static FRIEND_LIST_FAIL: string;
            /**
             * Dispatched when a call made to {@link nwf.fp.FriendPresence#getPresenceData getPresenceData} of the {@link nwf.fp.FriendPresence FriendPresence} class is successful.
             * @property {string} [PRESENCE_DATA_SUCCESS='presenceDataSuccess']
             * @static @constant
             * @since 1.0
             */
            static PRESENCE_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.fp.FriendPresence#getPresenceData getPresenceData} of the {@link nwf.fp.FriendPresence FriendPresence} class failed.
             * @property {string} [PRESENCE_DATA_FAIL='presenceDataFail']
             * @since 1.0
             * @static @constant
             */
            static PRESENCE_DATA_FAIL: string;
            /**
             * Dispatched when logged-in to the Friend Presence server. Initiated by {@link nwf.fp.FriendPresence#login login} of the {@link nwf.fp.FriendPresence FriendPresence} class.
             * @property {string} [LOGIN_SUCCESS='loginSuccess']
             * @static @constant
             * @since 1.0
             */
            static LOGIN_SUCCESS: string;
            /**
             * Dispatched when logging in to the Friend Presence server failed. Initiated by {@link nwf.fp.FriendPresence#login login} of the {@link nwf.fp.FriendPresence FriendPresence} class.
             * @property {string} [LOGIN_FAIL='loginFail']
             * @since 1.0
             * @static @constant
             */
            static LOGIN_FAIL: string;
            /**
             * Dispatched when logged-out of the Friend Presence server. Initiated by {@link nwf.fp.FriendPresence#logout logout} of the {@link nwf.fp.FriendPresence FriendPresence} class.
             * @property {string} [LOGOUT_SUCCESS='logoutSuccess']
             * @static @constant
             * @since 1.0
             */
            static LOGOUT_SUCCESS: string;
            /**
             * Dispatched when logging out of the Friend Presence server failed. Initiated by {@link nwf.fp.FriendPresence#logout logout} of the {@link nwf.fp.FriendPresence FriendPresence} class.
             * @property {string} [LOGOUT_FAIL='logoutFail']
             * @since 1.0
             * @static @constant
             */
            static LOGOUT_FAIL: string;
        }
    }
}
declare module nwf {
    module fp {
        class FriendPresence extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the Nintendo Friend Presence system.
             *
             * Class purpose:
             *
             * - Login/Logout
             * - check friends status
             * - get / set application meta-data
             * - get / update status of user
             *
             * __Note:__ The Friend Presence feature must be enabled in the Features page and the Network Access setting in the Network page of Project Settings must NOT be set to disabled for the feature to work and for `nwf.fp` to be defined.
             *
             * Example usage:
             *
             *      var FP = nwf.fp.FriendPresence.getInstance();
             *      FP.addEventListener( nwf.events.FriendPresenceEvent.LOGIN_SUCCESS, onLogin, this );
             *      // See documentation for the login function for a way to handle errors
             *      FP.login();
             *
             *      function onLogin( evt ) {
             *          FP.removeEventListener( nwf.events.FriendPresenceEvent.LOGIN_SUCCESS, onLogin, this );
             *
             *          FP.addEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS, onList, this );
             *          // See documentation for the getFriendList function for a way to handle errors
             *          FP.getFriendList();
             *      }
             *
             *      function onList( evt ) {
             *          FP.removeEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS, onList, this );
             *
             *          var fl = evt.friendList;
             *          console.log( 'Friend List: ' + fl.toString() );
             *      }
             *
             * The `FriendPresence` class dispatches the following events:
             *
             * - nwf.events.FriendPresenceEvent.FRIEND_LIST_FAIL
             * - nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS
             * - nwf.events.FriendPresenceEvent.LOGIN_FAIL
             * - nwf.events.FriendPresenceEvent.LOGIN_SUCCESS
             * - nwf.events.FriendPresenceEvent.LOGOUT_FAIL
             * - nwf.events.FriendPresenceEvent.LOGOUT_SUCCESS
             * - nwf.events.FriendPresenceEvent.PRESENCE_DATA_SUCCESS
             *
             * @class nwf.fp.FriendPresence
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             * @singleton
             */
            /**
             * @private
             * The `new` method is not used to get an instance of `FriendPresence`; use `#getInstance` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Returns `true` if the local application is logged in, or `false` if it is not.
             * @property {Boolean} [loggedIn=true]
             * @since 1.0
             * @readonly
             */
            loggedIn: boolean;
            /**
             * The Presence Data for the local host.
             * @property {nwf.fp.PresenceData} [myPresenceData=nwf.fp.PresenceData]
             * @since 1.0
             * @readonly
             */
            myPresenceData: nwf.fp.PresenceData;
            /**
             * Indicates whether on-line status will be published. When set to `true`, the local host's presence information will not be delivered to friends. When set to `false`, the information will be delivered.
             * @property {Boolean} [hideMyPresence=false]
             * @readonly
             * @since 1.0
             */
            hideMyPresence: boolean;
            /**
              * Logs in to the friend server. Call this before attempting to retrieve data from the server. It is highly recommended to stay logged in for the time that the application is open. Be sure to call `#logout()` before the application exits.
              *
              *  Example usage of a safe event chain:
              *
              *      var FP = nwf.fp.FriendPresence.getInstance();
              *
              *      FP.addEventListener( nwf.events.FriendPresenceEvent.LOGIN_SUCCESS, onLogin, this );
              *      FP.addEventListener( nwf.events.FriendPresenceEvent.LOGIN_FAIL, onLogin, this );
              *
              *      console.log( "Attempting to log in to the Friend Presence server..." );
              *      try {
              *          FP.login();
              *      } catch(err) {
              *          console.error( "login did not succeed! Are you connected to the Internet? Received instead: " + err.message );
              *      }
              *
              *      function onLogin( evt ) {
              *          FP.removeEventListener( nwf.events.FriendPresenceEvent.LOGIN_SUCCESS, onLogin, this );
              *          FP.removeEventListener( nwf.events.FriendPresenceEvent.LOGIN_FAIL, onLogin, this );
              *
              *          if (evt.type === nwf.events.FriendPresenceEvent.LOGIN_SUCCESS) {
              *              // Once logged in a friend list can be received
              *              FP.getFriendList();
              *      } else {
              *              console.warn( 'Attempt to log in to the Friend Presence server failed.' );
              *          }
              *      }
              *
              * @see {@link nwf.events.FriendPresenceEvent}
              * @returns {Boolean} Returns `true` if call is successful, and `false` otherwise.
              * @since 1.0
              */
            login(): number;
            /**
             * Logs out from the friend server. This function will be called automatically when the application exits, but is available to call manually if necessary. Should only be called once per use session in order to prevent overloading the server.
             *
             * @see {@link nwf.events.FriendPresenceEvent}
             * @returns {Boolean} Returns `true` if call is successful, and `false` otherwise.
             * @since 1.0
             */
            logout(): number;
            /**
             * Gets the friend list from the active network account on the Wii U. This fires off the event chain for acquiring the actual {@link nwf.events.FriendPresenceEvent#friendList Friend List} array, and informs the developer of any immediate (synchronous) failures.
             * Example usage of a safe event chain:
             *
             *      var FP = nwf.fp.FriendPresence.getInstance();
             *      [...] // Go through the login process
             *      FP.addEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS, onList, this );
             *      FP.addEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_FAIL, onList, this );
             *
             *      console.log( "Attempting to get friend list..." );
             *      try {
             *          FP.getFriendList();
             *      } catch(err) {
             *          console.error( "getFriendList did not succeed! Did you log in first? Received instead: " + err.message );
             *      }
             *
             *      function onList( evt ) {
             *          FP.removeEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS, onList );
             *          FP.removeEventListener( nwf.events.FriendPresenceEvent.FRIEND_LIST_FAIL, onList );
             *
             *          if (evt.type === nwf.events.FriendPresenceEvent.FRIEND_LIST_SUCCESS) {
             *              var fl = evt.friendList;
             *              console.log( 'Friend List: ' + fl.toString() );
             *          } else {
             *              console.warn( 'Attempt to get the friend list failed.' );
             *          }
             *      }
             *
             * @see {@link nwf.events.FriendPresenceEvent#friendList}
             * @param {Number} [offset=0] Index of the first item to obtain.
             * @param {Number} [size=0] Number of elements to get from the friend list, starting from the `startIndex` offset. The default value (0) will get the items from offset index (first parameter) to end of list.
             * @returns {Boolean} Returns `true` if call is successful, or `false` otherwise.
             * @since 1.0
             */
            getFriendList(offset?: number, size?: number): number;
            /**
             * Gets the PresenceData of a friend by the principalID.
             * If there is no friend corresponding to the principalID passed in as a parameter, an empty `nwf.fp.PresenceData` object is returned with the event.
             *
             * __Note:__ _You can not retrieve "your" own presence data with the prinipalID of the current account. Use #myPresenceData instead._
             * @see {@link nwf.events.FriendPresenceEvent#PRESENCE_DATA_SUCCESS}
             * @param {Number} principalID Principal ID of friend to get Presence Data.
             * @returns {Boolean} Returns `true` if call is successful, or `false` otherwise.
             * @since 1.0
             */
            getPresenceData(principalID: number): number;
            /** @ignore */
            private static s_instance;
            /**
             * Accesses an instance of the `FriendPresence` singleton.
             *
             * @method getInstance
             * @returns {nwf.fp.FriendPresence} The `FriendPresence` singleton instance.
             * @since 1.0
             * @static
             */
            static getInstance(): FriendPresence;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported(): boolean;
        }
    }
}
declare module nwf {
    module events {
        class HandwritingRecognitionEvent extends Event {
            /**
             * Events dispatched by the `{@link nwf.hwr.HandwritingRecognition HandwritingRecognition}` class.
             *
             * @class nwf.events.HandwritingRecognitionEvent
             * @see {@link nwf.hwr.HandwritingRecognition}
             * @extends nwf.events.Event
             * @author Shawn Gates
             * @author Nate Long
             * @author Corey Birnbaum
             */
            constructor();
            /**
             * An array of `nwf.hwr.CharacterInfo` objects containing the character information that was recognized by the system.
             * If no characters are recognized then this will be an empty `array`.
             * @property {nwf.hwr.CharacterInfo[]} [results=[]]
             * @readonly
             * @since 1.6
             */
            results: nwf.hwr.CharacterInfo[];
            /**
             * The time that it took to complete the recognition in milliseconds.
             * @property {Number} [recognitionTime=0]
             * @readonly
             * @since 1.6
             */
            recognitionTime: Number;
            /**
             * The event dispatched when `{@link nwf.hwr.HandwritingRecognition#recognize recognize}` is called from the `{@link nwf.hwr.HandwritingRecognition HandwritingRecognition}` class.
             * @property {String} [RECOGNITION_COMPLETE='recognitionComplete']
             * @since 1.6
             * @static @constant
             */
            static RECOGNITION_COMPLETE: string;
        }
    }
}
declare module nwf {
    module hwr {
        class CharacterInfo {
            /**
             * Object that stores the character recognition information.
             * Returned by an `nwf.events.HandwritingRecognitionEvent.RECOGNITION_COMPLETE` event.
             *
             * @class nwf.hwr.CharacterInfo
             * @author Shawn Gates
             */
            constructor();
            /**
             * The recognition result as a character string.
             * Only `ASCII` characters will have a `char` value.
             * This property will equal `null` for non-`ASCII` characters and the `#code` property should be used.
             * @property {String} [character='']
             * @readonly
             * @since 1.6
             */
            character: string;
            /**
             * Character code (`UCS-4`) of the character result.
             * @property {Number} [code=0]
             * @readonly
             * @since 1.6
             */
            code: number;
            /**
             * Value indicating the accuracy of the character result.
             * The lower the value, the more accurate the result.
             * @property {Number} [score=0]
             * @readonly
             * @since 1.6
             */
            score: number;
        }
    }
}
declare module nwf {
    module hwr {
        /**
         * Character set to use for character recognition.
         *
         * @enum nwf.hwr.CharacterSet
         * @author Shawn Gates
         * @author Nate Long
         * @author Corey Birnbaum
         */
        var CharacterSet: {
            JAPANESE_ALL: number;
            JAPANESE_ALL_ADVANCED: number;
            JAPANESE_ALPHANUM: number;
            ALPHANUM_LATIN1: number;
            ROMANIAN: number;
            ENGLISH_ALPHANUM: number;
            CHINESE_SIMPLIFIED: number;
            CHINESE_TRADITIONAL: number;
            DUTCH: number;
            FRENCH: number;
            GERMAN: number;
            HANGUL: number;
            HIRA: number;
            HIRAKATA_ALPHANUM: number;
            ITALIAN: number;
            KANJI_COMMON: number;
            KANJI_ADVANCED: number;
            KATA: number;
            KOREAN: number;
            KOREAN_ADVANCED: number;
            PORTUGUESE: number;
            RUSSIAN: number;
            SPANISH: number;
        };
    }
}
declare module nwf {
    module hwr {
        /**
         * Subset of characters to use when recognizing characters.
         *
         * @enum nwf.hwr.CharacterSubset
         * @author Shawn Gates
         */
        var CharacterSubset: {
            ALL: number;
            GREEK: number;
            HANGUL: number;
            HANJA: number;
            HIRA: number;
            HONGKONG: number;
            KANJI_COMMON: number;
            KANJI_ADVANCED: number;
            KATA: number;
            LALPHA: number;
            LRUSSIAN: number;
            NUMBER: number;
            SYMBOL: number;
            UALPHA: number;
            URUSSIAN: number;
        };
    }
}
declare module nwf {
    module hwr {
        import EventDispatcher = nwf.events.EventDispatcher;
        class HandwritingRecognition extends EventDispatcher {
            /**
             * Class for handwriting recognition from point data.
             *
             * The `HandwritingRecognition` class dispatches the following events:
             *
             * - nwf.events.HandwritingRecognitionEvent.RECOGNITION_COMPLETE
             *
             * Below is an example of how to utilize this API:
             *
             *          // Declare variables
             *          var recog = nwf.hwr.HandwritingRecognition.getInstance(),
             *              touchPanel = nwf.input.WiiUGamePad.getController().touchPanel,
             *              timer;
             *
             *          // Add HandwritingRecognition listeners
             *          recog.addEventListener(nwf.events.HandwritingRecognitionEvent.RECOGNITION_COMPLETE, onComplete);
             *
             *          // Add listeners to the Wii U Game Pad touch panel
             *          touchPanel.addEventListener(nwf.events.TouchControlEvent.TOUCH_START, onTouchStart);
             *          touchPanel.addEventListener(nwf.events.TouchControlEvent.UPDATE, onTouchMove);
             *          touchPanel.addEventListener(nwf.events.TouchControlEvent.TOUCH_END, onTouchEnd);
             *
             *          // Report the results of the recognition process
             *          function onComplete(evt) {
             *              var result, len, i;
             *
             *              // If no characters were recognized, len will equal 0 and the loop won't do anything
             *              for(i = 0, len = evt.results.length; i < len; i++) {
             *                  result = evt.results[i];
             *                  console.log(result.char + ': ' + result.score);
             *              }
             *          }
             *
             *          // When the user begins drawing, start recording the stroke
             *          function onTouchStart() {
             *              clearTimeout(timer);
             *              recog.beginStroke();
             *          }
             *
             *          // Record all the points that the user draws
             *          function onTouchMove(evt) {
             *              recog.addStrokePoint(evt.screenX, evt.screenY);
             *          }
             *
             *          // When the user stops drawing, end the stroke
             *          function onTouchEnd() {
             *              recog.endStroke();
             *
             *              // Start a timer to recognize the strokes if the user doesn't draw for a short while
             *              timer = setTimeout(commitStrokes, 350);
             *          }
             *
             *          // Attempted to recognize the character that the user has drawn
             *          function commitStrokes() {
             *              // This will fire a nwf.events.HandwritingRecognitionEvent.RECOGNITION_COMPLETE
             *              recog.recognize(nwf.hwr.CharacterSet.ENGLISH_ALPHANUM);
             *          }
             *
             * @class nwf.hwr.HandwritingRecognition
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Shawn Gates
             * @author Nate Long
             * @author Corey Birnbaum
             * @hwr
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `HandwritingRecognition` singleton; use `#getInstance` instead.
             * @method constructor
             * @since 1.6
             */
            constructor();
            /**
             * A list of {@link nwf.hwr.CharacterSet CharacterSets} currently loaded by the recognition system.
             *
             * @property {Number[]} [loadedCharacterSets=[]]
             * @readonly
             * @since 1.6
             */
            loadedCharacterSets: any;
            /**
             * Clear all current stroke data.
             * @method clear
             * @since 1.6
             */
            clear(): void;
            /**
             * Initialize a stroke.
             * This will clear all stroke data that hasn't been commited with `#endStroke`.
             * @method beginStroke
             * @since 1.6
             */
            beginStroke(): void;
            /**
             * Call to signify the end of a stroke.
             * @method endStroke
             * @since 1.6
             */
            endStroke(): void;
            /**
             * Attempts to recognize the character of the added strokes.
             *
             * __Note:__ _Only one `recognize` operation may occur at a time.
             * Previous calls will be canceled if you call this function again before the previous one has completed._
             * @method recognize
             * @param {Number} characterSet Specify a `{@link nwf.hwr.CharacterSet CharacterSet}` to be used when recognizing the strokes.
             * @param {Number} [subSet=null] Specify a `{@link nwf.hwr.CharacterSubset CharacterSubset}` to be used when recognizing the strokes.
             * If omitted, `nwf.hwr.CharacterSubset.ALL` will be used.
             * @see nwf.events.HandwritingRecognitionEvent.RECOGNITION_COMPLETE
             * @since 1.6
             */
            recognize(characterSet: number, subSet?: number): void;
            /**
             * Adds a point of data to the current stroke.
             * @method addStrokePoint
             * @param {Number} x The x-coordinate of the point.
             * @param {Number} y The y-coordinate of the point.
             * @since 1.6
             */
            addStrokePoint(x: number, y: number): void;
            /**
             * Load an additional `{@link nwf.hwr.CharacterSet CharacterSet}` into memory.
             * @method loadCharacterSet
             * @param {Number} characterSet `{@link nwf.hwr.CharacterSet CharacterSet}` to load.
             * @since 1.6
             */
            loadCharacterSet(characterSet: number): void;
            /**
             * Unload a `{@link nwf.hwr.CharacterSet CharacterSet}` from memory.
             * @method unloadCharacterSet
             * @param {Number} characterSet The `{@link nwf.hwr.CharacterSet CharacterSet}` to unload.
             * @since 1.6
             */
            unloadCharacterSet(characterSet: number): void;
            /** @ignore */
            private static s_instance;
            /**
            * Accesses an instance of the `HandwritingRecognition` singleton.
            *
            * @method getInstance
            * @param {Number[]} [characterSets] Specifies additional `{@link nwf.hwr.CharacterSet CharacterSets}` to load when initializing.
            * @returns {nwf.hwr.HandwritingRecognition} The `HandwritingRecognition` singleton instance.
            * @see nwf.hwr.HandwritingRecognition.loadCharacterSet
            * @see nwf.hwr.HandwritingRecognition.unloadCharacterSet
            * @since 1.6
            * @static
            */
            static getInstance(characterSets?: any): HandwritingRecognition;
        }
    }
}
declare module nwf {
    module events {
        class GyroscopeControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `GyroscopeControl` Class.
             *
             * @see {@link nwf.input.control.GyroscopeControl}
             * @class nwf.events.GyroscopeControlEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Angular velocity around the x axis, measured in radians/second.
             * Range: -2&pi; - 2&pi;.
             * @property {Number}[rotationRateX=0]
             * @readonly
             * @since 1.0
             */
            rotationRateX: number;
            /**
             * Angular velocity around the y axis, measured in radians/second.
             * Range: -2&pi; - 2&pi;.
             * @property {Number} [rotationRateY=0]
             * @readonly
             * @since 1.0
             */
            rotationRateY: number;
            /**
             * Angular velocity around the z axis, measured in radians/second.
             * Range: -2&pi; - 2&pi;.
             * @property {Number}[rotationRateZ=0]
             * @readonly
             * @since 1.0
             */
            rotationRateZ: number;
            /**
             * Calculated angle of the device on the x axis. Measured in radians.
             * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction).
             * Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
             * @property {Number}[angleX=0]
             * @readonly
             * @since 1.0
             */
            angleX: number;
            /**
             * Calculated angle of the device on the y axis. Measured in radians.
             * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction).
             * Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
             * @property {Number}[angleY=0]
             * @readonly
             * @since 1.0
             */
            angleY: number;
            /**
             * Calculated angle of the device on the z axis. Measured in radians.
             * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction).
             * Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
             * @property {Number}[angleZ=0]
             * @readonly
             * @since 1.0
             */
            angleZ: number;
            /**
             * Dispatched continuously at the rate of 60Hz.
             * @property {String} [UPDATE='update']
             * @static @constant
             */
            static UPDATE: string;
            /**
             * Dispatched when the sensor has been successfully calibrated.
             * @property {String}  [CALIBRATION_SUCCESS='calibrationSuccess']
             * @since 1.0
             * @static @constant
             */
            static CALIBRATION_SUCCESS: string;
            /**
             * Dispatched when a calibration attempt is aborted, fails, or times out.
             * @property {String}  [CALIBRATION_FAIL='calibrationFail']
             * @since 1.0
             * @static @constant
             */
            static CALIBRATION_FAIL: string;
        }
    }
}
declare module nwf {
    module events {
        class MovementControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `MovementControl` Class.
             *
             * @see {@link nwf.input.control.MovementControl}
             * @class nwf.events.MovementControlEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Angle of the vector from the center of the control to the X and Y position in radians.
             * @property {Number} [angle=0]
             * @type Number
             * @readonly
             * @since 1.0
             */
            angle: number;
            /**
             * Movement along the x plane.
             * From -1.0 to 1.0 along a screen coordinate system.
             * @property {Number} [movementX=0]
             * @readonly
             * @since 1.0
             */
            movementX: number;
            /**
             * Movement along the y plane.
             * From -1.0 to 1.0 along a screen coordinate system.
             * @property {Number} [movementY=0]
             * @readonly
             * @since 1.0
             */
            movementY: number;
            /**
             * Movement of control mapped to the screen's x plane.
             * Value measured in pixels.
             * @property {Number} [screenX=0]
             * @readonly
             * @since 1.0
             */
            screenX: number;
            /**
             * Movement of control mapped to the screen's y plane.
             * Value measured in pixels.
             * @property {Number} [screenY=0]
             * @readonly
             * @since 1.0
             */
            screenY: number;
            /**
             * If set to `true`, the y values are inverted for this control. If set to `false`, they are not.
             * @property {Boolean} [invertedY=true]
             * @readonly
             * @since 1.0
             */
            invertedY: boolean;
            /**
             * Dispatched when the values of the control are changed by the user. Acts similar to the DOM [`onmousemove`](https://developer.mozilla.org/en-US/docs/Web/API/element.onmousemove) event.
             * @property {String} [MOVE='move']
             * @since 1.0
             * @static @constant
             */
            static MOVE: string;
        }
    }
}
declare module nwf {
    module events {
        class AccelerometerControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `AccelerometerControl` Class.
             *
             * @class nwf.events.AccelerometerControlEvent
             * @see {@link nwf.input.control.AccelerometerControl}
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Acceleration along the x axis, measured in Gs.
             * @property {Number} [accelerationX=0]
             * @readonly
             * @since 1.0
             */
            accelerationX: number;
            /**
             * Acceleration along the y axis, measured in Gs.
             * @property {Number} [accelerationY=0]
             * @readonly
             * @since 1.0
             */
            accelerationY: number;
            /**
             * Acceleration along the z axis, measured in Gs.
             * @property {Number} [accelerationZ=0]
             * @readonly
             * @since 1.0
             */
            accelerationZ: number;
            /**
             * Magnitude of acceleration (length of x, y, and z).
             * @property {Number} [accelerationLength=0]
             * @readonly
             * @since 1.0
             */
            accelerationLength: number;
            /**
             * Change in acceleration (length of the difference along the x , y , and z axes relative to the previous values).
             * @property {Number} [accelerationSpeed=0]
             * @readonly
             * @since 1.0
             */
            accelerationSpeed: number;
            /**
             * Dispatched continuously at the rate of 60Hz.
             * @property {string} [UPDATE='update']
             * @since 1.0
             * @static @constant
             */
            static UPDATE: string;
        }
    }
}
declare module nwf {
    module events {
        class TouchControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `{@link nwf.input.control.TouchControl}` Class.
             *
             * @see {@link nwf.input.control.TouchControl}
             * @class nwf.events.TouchControlEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Raw x coordinate of the touch screen. The possible values are 0 - 4095.
             * @property [touchX=0]
             * @type Number
             * @readonly
             * @since 1.0
             */
            touchX: number;
            /**
             * Raw y coordinate of the touch screen. The possible values are 0 - 4095.
             * @property [touchY=0]
             * @type Number
             * @readonly
             * @since 1.0
             */
            touchY: number;
            /**
             * Touch point of control mapped to the screen's x plane.
             * Value measured in pixels.
             * @property [screenX=0]
             * @type Number
             * @readonly
             * @since 1.0
             */
            screenX: number;
            /**
             * Touch point of control mapped to the screen's y plane.
             * Value measured in pixels.
             * @property [screenY=0]
             * @type Number
             * @readonly
             * @since 1.0
             */
            screenY: number;
            /**
             * If set to `true`, the y values are inverted for this control. If set to `false`, they are not.
             *
             * @property [invertedY=true]
             * @type Boolean
             * @readonly
             * @since 1.0
             */
            invertedY: boolean;
            /**
             * Dispatched continuously at the rate of 60Hz while the screen is being touched.
             * @property {String} [UPDATE='update']
             * @since 1.0
             * @static @constant
             */
            static UPDATE: string;
            /**
             * Dispatched when the touch screen is first touched.
             * @property {String} [TOUCH_START='touchStart']
             * @since 1.2
             * @static @constant
             */
            static TOUCH_START: string;
            /**
             * Dispatched when the touch screen is no longer being touched.
             * @property {String} [TOUCH_END='touchEnd']
             * @since 1.2
             * @static @constant
             */
            static TOUCH_END: string;
        }
    }
}
declare module nwf {
    module events {
        class WeightControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `WeightControl` Class.
             *
             * @see {@link nwf.input.control.WeightControl}
             * @class nwf.events.WeightControlEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * The maximum measurable load on the sensor in kg.
             * @property {Number} [maxWeight=0]
             * @readonly
             * @since 1.2
             */
            maxWeight: number;
            /**
             * The measured load on the sensor calculated in kg.
             * @property {Number} [weight=0]
             * @readonly
             * @since 1.2
             */
            weight: number;
            /**
             * Average value calculated continuously over approximately 2 seconds' worth of samples in kg. The value will be updated on each event with new weight data.
             * @property {Number} [avgWeight=0]
             * @readonly
             * @since 1.2
             */
            avgWeight: number;
            /**
             * The difference in the measured load on the sensor from the previously measured value. Calculated in kg.
             * @see  nwf.events.WeightControlEvent.weight
             * @property {Number} [weightDelta=0]
             * @readonly
             * @since 1.2
             */
            weightDelta: number;
            /**
             * The difference in the average measured load on the sensor from the previously measured average value. Calculated in kg.
             * @see  nwf.events.WeightControlEvent.avgWeight
             * @property {Number} [avgWeightDelta=0]
             * @readonly
             * @since 1.2
             */
            avgWeightDelta: number;
            /**
             * Dispatched when the weight values change as a result of measured changes on the {@link nwf.input.control.WeightControl WeightControl} sensor.
             * @property {String} [WEIGHT_CHANGE='weightChange']
             * @static @constant
             * @since  1.2
             */
            static WEIGHT_CHANGE: string;
        }
    }
}
declare module nwf {
    module events {
        class DirectionControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `DirectionControl` Class.
             *
             * @class nwf.events.DirectionControlEvent
             * @see {@link nwf.input.control.DirectionControl}
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Direction along the x plane. Values can be -1, 0, or 1.
             * @property {Number} [directionX=0]
             * @readonly
             * @since 1.0
             */
            directionX: number;
            /**
             * Direction along the y plane. Values can be -1, 0, or 1.
             * @property {Number} [directionY=0]
             * @readonly
             * @since 1.0
             */
            directionY: number;
            /**
             * If set to `true`, the y values are inverted for this control. If set to `false`, they are not.
             * @property {Boolean} [invertedY=true]
             * @readonly
             * @since 1.0
             */
            invertedY: boolean;
            /**
             * Dispatched when the direction values change as a result of user input on the +Control Pad.
             * @property {string} [DIRECTION_CHANGE='directionChange']
             * @since 1.0
             * @static @constant
             */
            static DIRECTION_CHANGE: string;
        }
    }
}
declare module nwf {
    module events {
        class DPDControlEvent extends Event {
            /**
             * Defines events dispatched by instances of the `DPDControl` Class.
             *
             * @see {@link nwf.input.control.DPDControl}
             * @class nwf.events.DPDControlEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Pointer movement along the x plane.
             * From -1.0 to 1.0 along a screen coordinate system.
             * @property {Number} [pointerX=0]
             * @readonly
             * @since 1.0
             */
            pointerX: number;
            /**
             * Pointer movement along the y plane.
             * From -1.0 to 1.0 along a screen coordinate system.
             * @property {Number} [pointerY=0]
             * @readonly
             * @since 1.0
             */
            pointerY: number;
            /**
             * Pointer movement of control mapped to the screen's x plane.
             * Value measured in pixels.
             * @property {Number} [screenX=0]
             * @readonly
             * @since 1.0
             */
            screenX: number;
            /**
             * Pointer movement of control mapped to the screen's y plane.
             * Value measured in pixels.
             * @property {Number} [screenY=0]
             * @readonly
             * @since 1.0
             */
            screenY: number;
            /**
             * If set to `true`, the y values are inverted for this control. If set to `false`, they are not.
             * @property {Boolean} [invertedY=true]
             * @readonly
             * @since 1.0
             */
            invertedY: boolean;
            /**
             * Distance between the Sensor Bar, set on the TV, and the Wii Remote.
             * Measured in meters.
             * @property {Number} [distance=0]
             * @readonly
             * @since 1.0
             */
            distance: number;
            /**
             * Dispatched continuously at the rate of 60Hz while the DPD is pointed at the screen.
             * @property {string} [UPDATE='update']
             * @since 1.0
             * @static @constant
             */
            static UPDATE: string;
        }
    }
}
declare module nwf {
    module events {
        class ButtonControlEvent extends Event {
            private _button;
            /**
             * Defines events dispatched by instances of the `ButtonControl` Class.
             *
             * @class nwf.events.ButtonControlEvent
             * @see {@link nwf.input.control.ButtonControl}
             * @extends nwf.events.Event
             * @author Ryan Lynd
             */
            constructor(type: string);
            /**
             * Value of the pressed or released button.
             * @property [button=0]
             * @type uint16
             * @readonly
             * @since 1.0
             */
            button: number;
            /**
             * Triggered when a button is pressed.
             * @property {String} [PRESS='press']
             * @static @constant
             */
            PRESS: string;
            static PRESS: string;
            /**
             * Triggered when a button is released.
             * @property {String} [RELEASE='release']
             * @static @constant
             */
            RELEASE: string;
            static RELEASE: string;
        }
    }
}
declare module nwf {
    module events {
        class ControllerEvent extends Event {
            /**
             * Defines events dispatched by all Controller Class instances.
             *
             * @class nwf.events.ControllerEvent
             * @see {@link nwf.input.WiiUGamePad}
             * @see {@link nwf.input.WiiRemote}
             * @see {@link nwf.input.WiiUProController}
             * @see {@link nwf.input.WiiBalanceBoard}
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Controller name.
             *
             * __Note:__ _This is only set when nwf.events.ControllerEvent.EXTENSION_CONTROLLER_ADDED or nwf.events.ControllerEvent.EXTENSION_CONTROLLER_REMOVED is fired._
             * @property {String} [name='']
             * @readonly
             * @since 1.3
             */
            name: string;
            /**
             * Dispatched when a controller is connected to the Wii U.
             *
             * @property {String} [CONTROLLER_CONNECTED='controllerConnected']
             * @since 1.0
             * @static @constant
             */
            static CONTROLLER_CONNECTED: string;
            /**
             * Dispatched when a controller is disconnected from the Wii U.
             *
             * @property {String} [CONTROLLER_DISCONNECTED='controllerDisconnected']
             * @since 1.0
             * @static @constant
             */
            static CONTROLLER_DISCONNECTED: string;
            /**
             * Dispatched when the battery level of the target controller changes.
             *
             * @property {String} [BATTERY_LEVEL_CHANGE='batteryLevelChange']
             * @since 1.0
             * @see {@link nwf.input.BatteryLevel}
             * @static @constant
             */
            static BATTERY_LEVEL_CHANGE: string;
            /**
             * Dispatched when an extension controller is connected to a Wii Remote.
             *
             * @property {String} [EXTENSION_CONTROLLER_ADDED='extensionControllerAdded']
             * @since 1.0
             * @static @constant
             */
            static EXTENSION_CONTROLLER_ADDED: string;
            /**
             * Dispatched when an extension controller is disconnected from a Wii Remote.
             *
             * @property {String} [EXTENSION_CONTROLLER_REMOVED='extensionControllerRemoved']
             * @since 1.0
             * @static @constant
             */
            static EXTENSION_CONTROLLER_REMOVED: string;
            /**
             * Dispatched when the Wii Motion Plus adapter is attached to the Wii Remote.
             *
             * To receive this event the mode on the Wii Remote must be set to `MODE_FULL`.
             *
             * When an extension controller (Nunchuk, Classic Controller, etc) is added to the Wii Remote with the Motion Plus attached, this event will be fired again because the Motion Plus must be reset so the extension data can pass through.
             *
             * __Note:__ _If the same type of extension controller (e.g., Nunchuk) is removed and added multiple times this event will only fire the first time it is plugged in._
             *
             * The Wii Remote Plus will fire this at the same time as the connected event because the Motion Plus is already integrated.
             * @property {String} [MPLS_ADDED='mplsAdded']
             * @since 1.0
             * @static @constant
             */
            static MPLS_ADDED: string;
            /**
             * Dispatched when the Wii Motion Plus adapter is removed from the Wii Remote.
             *
             * To receive this event the mode on the Wii Remote must be set to `MODE_FULL`.
             *
             * When an extension contoller (Nunchuk, Classic Controller, etc.) is added to the Wii Remote with the Motion Plus attached, this event will be fired again because the Motion Plus must be reset so the extension data can pass through.
             *
             * __Note:__ _If the same type of extension controller (e.g., Nunchuk) is removed and added multiple times this event will only fire the first time it is plugged in._
             *
             * This event will fire when a regular Wii Remote connects without a Wii Motion Plus adapter plugged in.
             * @property {String} [MPLS_REMOVED='mplsRemoved']
             * @since 1.0
             * @static @constant
             */
            static MPLS_REMOVED: string;
        }
    }
}
declare module nwf {
    module input {
        /**
         * Defines constants for Controller Battery Level.
         *
         * @enum nwf.input.BatteryLevel
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var BatteryLevel: {
            CRITICAL: number;
            LOW: number;
            MEDIUM: number;
            HIGH: number;
            MAX: number;
            NO_BATTERY: number;
        };
    }
}
declare module nwf {
    module input {
        /**
         * Defines constants for Controller button values.
         *
         * @enum nwf.input.ControllerButton
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var ControllerButton: {
            GAMEPAD_LEFT: number;
            GAMEPAD_RIGHT: number;
            GAMEPAD_UP: number;
            GAMEPAD_DOWN: number;
            GAMEPAD_A: number;
            GAMEPAD_B: number;
            GAMEPAD_X: number;
            GAMEPAD_Y: number;
            GAMEPAD_R: number;
            GAMEPAD_L: number;
            GAMEPAD_ZR: number;
            GAMEPAD_ZL: number;
            GAMEPAD_R_STICK: number;
            GAMEPAD_L_STICK: number;
            GAMEPAD_PLUS: number;
            GAMEPAD_MINUS: number;
            GAMEPAD_POWER: number;
            WII_REMOTE_LEFT: number;
            WII_REMOTE_RIGHT: number;
            WII_REMOTE_DOWN: number;
            WII_REMOTE_UP: number;
            WII_REMOTE_A: number;
            WII_REMOTE_B: number;
            WII_REMOTE_1: number;
            WII_REMOTE_2: number;
            WII_REMOTE_PLUS: number;
            WII_REMOTE_MINUS: number;
            NUNCHUK_Z: number;
            NUNCHUK_C: number;
            CLASSIC_UP: number;
            CLASSIC_LEFT: number;
            CLASSIC_ZR: number;
            CLASSIC_X: number;
            CLASSIC_A: number;
            CLASSIC_Y: number;
            CLASSIC_B: number;
            CLASSIC_ZL: number;
            CLASSIC_RESERVED: number;
            CLASSIC_R: number;
            CLASSIC_PLUS: number;
            CLASSIC_MINUS: number;
            CLASSIC_L: number;
            CLASSIC_DOWN: number;
            CLASSIC_RIGHT: number;
            PRO_UP: number;
            PRO_LEFT: number;
            PRO_ZR: number;
            PRO_X: number;
            PRO_A: number;
            PRO_Y: number;
            PRO_B: number;
            PRO_ZL: number;
            PRO_R: number;
            PRO_PLUS: number;
            PRO_MINUS: number;
            PRO_L: number;
            PRO_DOWN: number;
            PRO_RIGHT: number;
            PRO_R_STICK: number;
            PRO_L_STICK: number;
        };
    }
}
declare module nwf {
    module input {
        /**
         * Defines constants for input controller types.
         *
         * @enum nwf.input.ControllerType
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var ControllerType: {
            GAMEPAD: number;
            WII_REMOTE: number;
            CLASSIC: number;
            NUNCHUK: number;
            BALANCE_BOARD: number;
            WIIU_PRO: number;
            UNKNOWN: number;
        };
    }
}
declare module nwf {
    module input {
        /**
         * Defines constants for input control types.
         *
         * @enum nwf.input.InputControlType
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var InputControlType: {
            ACCELERATION: string;
            BUTTON: string;
            DIRECTION: string;
            GYROSCOPE: string;
            MOVEMENT: string;
            DPD: string;
            TRIGGER: string;
            TOUCH: string;
            WEIGHT: string;
        };
    }
}
declare module nwf {
    module input {
        module control {
            class ButtonControl extends nwf.events.EventDispatcher {
                private _keys;
                private _buttonToKeyMap;
                private _keyToButtonMap;
                private _supportedControllers;
                private _buttonDownEvent;
                private _buttonUpEvent;
                private _eventsAdded;
                /**
                 * The `ButtonControl` class represents the buttons of a compatible controller.
                 *
                 *     // Get instance from GamePad Controller
                 *     var gpButtons = nwf.input.WiiUGamePad.getController().buttons;
                 *     gpButtons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onGamePadPress, this );
                 *
                 * The `ButtonControl` class dispatches the following events:
                 *
                 *  - nwf.events.ButtonControlEvent.PRESS
                 *  - nwf.events.ButtonControlEvent.RELEASE
                 *
                 * @class nwf.input.control.ButtonControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 * @author Shawn Gates
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a `ButtonControl` object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * The bitwise OR value of all pressed buttons. This allows the developer to check for button combinations in one query:
                 *
                 *      var gpButtons = nwf.input.WiiUGamePad.getController().buttons;
                 *
                 *      function update() {
                 *          var btnConst = nwf.input.ControllerButton;
                 *          if ((gpButtons.buttonValue & btnConst.GAMEPAD_L) !== 0) console.log( 'Left shoulder button is being pressed' );
                 *
                 *          if ((gpButtons.buttonValue & (btnConst.GAMEPAD_L | btnConst.GAMEPAD_R)) !== 0) console.log( 'A shoulder button is being pressed' );
                 *
                 *          if ((gpButtons.buttonValue & (btnConst.GAMEPAD_L + btnConst.GAMEPAD_R)) === btnConst.GAMEPAD_L + btnConst.GAMEPAD_R) console.log( 'Both shoulder buttons are being pressed' );
                 *
                 *          webkitRequestAnimationFrame( update );
                 *      }
                 *      webkitRequestAnimationFrame( update );
                 *
                 * @property {uint32} [buttonValue=0]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.ControllerButton
                 */
                buttonValue: number;
                /**
                 * Determines whether the specified button (or button combo) is being pressed. This is useful for polling on a per-frame basis, as opposed to the event listener approach.
                 *
                 *      function update() {
                 *          if (gp.connected) { // gp would be an instance of nwf.input.WiiUGamePad
                 *              if (gp.buttons.isButtonPressed(nwf.input.ControllerButton.GAMEPAD_X)) {
                 *                  console.info( 'GAMEPAD_X is pressed!' );
                 *              }
                 *          }
                 *      }
                 *
                 * @param {Number} button The button code as defined in `{@link nwf.input.ControllerButton}`.
                 * @param {Boolean} [strict=false] If `true`, returns `true` if only the defined button is pressed.
                 * If `false`, returns `true` if the defined button is pressed with any other combination of buttons.
                 * @returns {Boolean} Returns `true` if button is down, or `false` if it is not.
                 * @since 1.0
                 */
                isButtonPressed(button: number, strict?: boolean): boolean;
                getButtonState(controllerID: string, btn: number): boolean;
                private onKeyDown(evt);
                private onKeyUp(evt);
                private eventCheck(evt, btn);
                private _addInputListeners(display);
                private resetListeners(display);
                private _buildButtonMap();
                private setButton(controller, keyCode, button);
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class AccelerometerControl extends nwf.events.EventDispatcher {
                /**
                 * The `AccelerometerControl` class represents the accelerometer sensor of a compatible controller.
                 *
                 * The coordinate system is backwards to what most developers are probably used to. In contrast to the WPAD library, when the Wii Remote is pointed toward the TV screen, the forward direction is Z+, upward direction is Y+, and leftward direction is X+.
                 *
                 *     // Get instance from GamePad Controller
                 *     var gpACC = nwf.input.WiiUGamePad.getController().accelerometer;
                 *
                 * The values returned from `AccelerometerControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `AccelerometerControl` class dispatches the following event:
                 *
                 * - nwf.events.AccelerometerControlEvent.UPDATE
                 *
                 * @class nwf.input.control.AccelerometerControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of an `AccelerometerControl` object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Acceleration along the x axis, measured in Gs.
                 * @property {Number} [accelerationX=0]
                 * @readonly
                 * @since 1.0
                 */
                accelerationX: number;
                /**
                 * Acceleration along the y axis, measured in Gs.
                 * @property {Number} [accelerationY=0]
                 * @readonly
                 * @since 1.0
                 */
                accelerationY: number;
                /**
                 * Acceleration along the z axis, measured in Gs.
                 * @property {Number} [accelerationZ=0]
                 * @readonly
                 * @since 1.0
                 */
                accelerationZ: number;
                /**
                 * Magnitude of acceleration (length of x, y, and z).
                 * @property [accelerationLength=0]
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                accelerationLength: number;
                /**
                 * Change in acceleration (length of the difference along the x, y, and z axes relative to the previous values).
                 * @property [accelerationSpeed=0]
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                accelerationSpeed: number;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class DirectionControl extends nwf.events.EventDispatcher {
                /**
                 * The `DirectionControl` class represents the +Control Pad of a compatible controller.
                 *
                 *      // Get instance from GamePad Controller
                 *      var gpControlPad = nwf.input.WiiUGamePad.getController().controlPad;
                 *
                 * The `DirectionControl` class dispatches the following event:
                 *
                 * - nwf.events.DirectionControlEvent.DIRECTION_CHANGE
                 *
                 * @class nwf.input.control.DirectionControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 * @author Shawn Gates
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a `DirectionControl` object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Direction along the x plane.
                 * Values can be -1, 0, or 1.
                 * `Left  = -1`
                 * `Rest  =  0`
                 * `Right =  1`
                 * @property {int} [directionX=0]
                 * @readonly
                 * @since 1.0
                 */
                directionX: number;
                /**
                 * Direction along the y plane.
                 * Values can be -1, 0, or 1.
                 * `Up   = -1`
                 * `Rest =  0`
                 * `Down =  1`
                 * @property {int} [directionY=0]
                 * @readonly
                 * @since 1.0
                 */
                directionY: number;
                /**
                 * Gets/sets whether the y values are inverted for this control.
                 *
                 * `false`: The y values decrease with the downward direction of the control.
                 * This is consistent with the Cartesian coordinate system.
                 *
                 * `true`: The y values increase with the downward direction of the control.
                 * This is consistent with the Screen coordinate system.
                 *
                 * @property {Boolean} [invertedY=true]
                 * @since 1.0
                 */
                invertedY: boolean;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class DPDControl extends nwf.events.EventDispatcher {
                /**
                 * The `DPDControl` class represents the DPD (pointer) of a compatible controller such as the Wii Remote.
                 *
                 * To use this control, a controller instance must have the `{@link nwf.input.WiiRemote#mode mode}` property set to `{@link nwf.input.WiiRemote#MODE_DPD MODE_DPD}` or `{@link nwf.input.WiiRemote#MODE_FULL MODE_FULL}`, or the `{@link nwf.input.WiiRemote#mouseEnabled mouseEnabled}` property set to `true`.
                 *
                 *      // Get instance from Wii Remote Player 1
                 *      var remoteCursor = nwf.input.WiiRemote.getController(0).cursor;
                 *
                 * The values returned from `DPDControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `DPDControl` class dispatches the following event:
                 *
                 * - nwf.events.DPDControlEvent.UPDATE
                 *
                 * @class nwf.input.control.DPDControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 * @author Shawn Gates
                 */
                /**
                * @private
                * The `new` method is not used to get an instance of a `DPDControl` object.
                * @method constructor
                * @since 1.0
                */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Pointer movement along the x plane.
                 * From `-1.0` to `1.0` along a screen coordinate system.
                 * Returns values outside of this range when pointing off-screen.
                 * @property {Number} [pointerX=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerX: number;
                /**
                 * Pointer movement along the y plane.
                 * From `-1.0` to `1.0` along a screen coordinate system.
                 * Returns values outside of this range when pointing off-screen.
                 * @property {Number} [pointerY=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerY: number;
                /**
                 * Pointer movement of control mapped to the screen's x plane.
                 * @property {Number} [screenX=0.0]
                 * Value measured in pixels.
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                screenX: number;
                /**
                 * Pointer movement of control mapped to the screen's y plane.
                 * @property {Number} [screenY=0.0]
                 * Value measured in pixels.
                 * @readonly
                 * @since 1.0
                 */
                screenY: number;
                /**
                 * Difference vector from the previous pointing position.
                 * @property {Object} [pointerDifference={x:0.0, y:0.0}]
                 * @readonly
                 * @since 1.0
                 */
                pointerDifference: {
                    x: number;
                    y: number;
                };
                /**
                 * Length of difference from the previous pointing position.
                 * @property {Number} [pointerSpeed=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerSpeed: number;
                /**
                 * Directional vector of the pointer's horizontal plane.
                 * The vector has a magnitude of 1, and the positive directions are to the right and down.
                 * @property {Object} [pointerHorizon={x:0.0, y:0.0}]
                 * @readonly
                 * @since 1.0
                 */
                pointerHorizon: {
                    x: number;
                    y: number;
                };
                /**
                 * Difference from the previous directional vector.
                 * @property {Object} [pointerHorizonDifference={x:0.0, y:0.0}]
                 * @readonly
                 * @since 1.0
                 */
                pointerHorizonDifference: {
                    x: number;
                    y: number;
                };
                /**
                 * Magnitude of difference from the previous directional vector.
                 * @property {Number} [pointerHorizonSpeed=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerHorizonSpeed: number;
                /**
                 * The rotation of the pointer in degrees.
                 * @property {Number} [pointerRotation=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerRotation: number;
                /**
                 * Maintains the number of objects that were used to recognize the pointing position. It is normally 1 or 2; 0 indicates an invalid position. A stored negative value indicates that the recognition result is not very reliable.
                 * @property {Number} [pointerAccuracy=0.0]
                 * @readonly
                 * @since 1.0
                 */
                pointerAccuracy: number;
                /**
                 * Distance between the Sensor Bar, set on the TV, and the Wii Remote.
                 * Measured in meters.
                 * @property [distance=0.0]
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                distance: number;
                /**
                 * Difference from previous distance data.
                 * @property [distanceDifference=0.0]
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                distanceDifference: number;
                /**
                 * Magnitude of the difference from previous distance data.
                 * @property [distanceSpeed=0.0]
                 * @type Number
                 * @readonly
                 * @since 1.0
                 */
                distanceSpeed: number;
                /**
                 * Gets/sets whether the y values are inverted for this control.
                 *
                 * `false`: The y values decrease with the downward direction of the control.
                 * This is consistent with the Cartesian coordinate system.
                 *
                 * `true`: The y values increase with the downward direction of the control.
                 * This is consistent with the Screen coordinate system.
                 *
                 * @property {Boolean} [invertedY=true]
                 * @since 1.0
                 */
                invertedY: boolean;
                /**
                 * Sets the resolution used to calculate the `screenX` and
                 * `screenY` properties of the control.
                 * <p>By default, the control resolution is set to the TV's resolution.</p>
                 * @param   {Number}    screenWidth     Number of pixels wide.
                 * @param   {Number}    screenHeight    Number of pixels tall.
                 * @since 1.0
                 */
                setScreenResolution(screenWidth: number, screenHeight: number): void;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class GyroscopeControl extends nwf.events.EventDispatcher {
                /**
                 * The `GyroscopeControl` class represents the gyroscope sensor of a compatible controller.
                 *
                 * To use this control, a controller instance must have the `{@link nwf.input.WiiRemote#mode mode}` property set to `{@link nwf.input.WiiRemote#MODE_GYRO MODE_GYRO}` or `{@link nwf.input.WiiRemote#MODE_FULL MODE_FULL}`.
                 *
                 *     // Get instance from GamePad Controller
                 *     var gpGyro = nwf.input.WiiUGamePad.getController().gyroscope;
                 *
                 * The below diagram shows the gyroscope's axes with relation to each controller when held vertically.
                 * {@img axis-diagram.png}
                 *
                 * The values returned from `GyroscopeControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `GyroscopeControl` class dispatches the following event:
                 *
                 * - nwf.events.GyroscopeControlEvent.CALIBRATION_FAIL
                 * - nwf.events.GyroscopeControlEvent.CALIBRATION_SUCCESS
                 * - nwf.events.GyroscopeControlEvent.UPDATE
                 *
                 * @class nwf.input.control.GyroscopeControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 * @author Shawn Gates
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a `GyroscopeControl` object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Angular velocity around the x axis, measured in radians/second.
                 * Range: -2&pi; - 2&pi;.
                 * @property {Number} [rotationRateX=0]
                 * @readonly
                 * @since 1.0
                 */
                rotationRateX: number;
                /**
                 * Angular velocity around the y axis, measured in radians/second.
                 * Range: -2&pi; - 2&pi;.
                 * @property {Number} [rotationRateY=0]
                 * @readonly
                 * @since 1.0
                 */
                rotationRateY: number;
                /**
                 * Angular velocity around the z axis, measured in radians/second.
                 * Range: -2&pi; - 2&pi;.
                 * @property {Number} [rotationRateZ=0]
                 * @readonly
                 * @since 1.0
                 */
                rotationRateZ: number;
                /**
                 * Calculated angle of the device on the x axis, measured in radians.
                 * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction). Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
                 * @property {Number} [angleX=0]
                 * @readonly
                 * @since 1.0
                 */
                angleX: number;
                /**
                 * Calculated angle of the device on the y axis, measured in radians.
                 * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction). Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
                 * @property {Number} [angleY=0]
                 * @readonly
                 * @since 1.0
                 */
                angleY: number;
                /**
                 * Calculated angle of the device on the z axis, measured in radians.
                 * A complete rotation returns a value of 2&pi; ( or -2&pi; in the other direction). Additional rotation adds to this value, with each full rotation equaling a multiple of 2&pi;.
                 * @property {Number} [angleZ=0]
                 * @readonly
                 * @since 1.0
                 */
                angleZ: number;
                /**
                * The x directional vector of the device.
                * Returns a vector object with x, y, and z properties. This should be a unit vector.
                * @property {Object} [dirVectorX={x:0, y:0, z:0}]
                * @readonly
                * @since 1.0
                */
                dirVectorX: {
                    x: number;
                    y: number;
                    z: number;
                };
                /**
                * The y directional vector of the device.
                * Returns a vector object with x, y, and z properties. This should be a unit vector.
                * @property {Object} [dirVectorY={x:0, y:0, z:0}]
                * @readonly
                * @since 1.0
                */
                dirVectorY: {
                    x: number;
                    y: number;
                    z: number;
                };
                /**
                * The z directional vector of the device.
                * Returns a vector object with x, y, and z properties. This should be a unit vector.
                * @property {Object} [dirVectorZ={x:0, y:0, z:0}]
                * @readonly
                * @since 1.0
                */
                dirVectorZ: {
                    x: number;
                    y: number;
                    z: number;
                };
                /**
                 * Performs an at-rest (zero-point) calibration.
                 * A calibration event is triggered when the sensor is successfully calibrated.
                 * If calibration is not successful in the allotted time (default: 30s) a calibration failed event will be triggered.
                 *
                 * __To Use:__ Direct the user to place the controller at rest.
                 * The calibration process ends when the sensor values stabilize.
                 *
                 * @param   {Number} [maxTime=30000] The amount of time in milliseconds before the operation will time out.
                 * @returns {Boolean} The status of the operation: `true` if successful, `false` if an error is generated. An error occurs because the control is muted or is already being calibrated.
                 * @since 1.0
                 * @see nwf.events.GyroscopeControlEvent.CALIBRATION_SUCCESS
                 * @see nwf.events.GyroscopeControlEvent.CALIBRATION_FAIL
                 * @async
                 */
                calibrate(maxTime?: number): boolean;
                /**
                 * Cancels sensor calibration and dispatches a calibration failed event.
                 * @since 1.0
                 * @see nwf.events.GyroscopeControlEvent.CALIBRATION_FAIL
                 */
                cancelCalibration(): void;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class MovementControl extends nwf.events.EventDispatcher {
                /**
                 * The `MovementControl` class represents the 2D movement (x,y) control of a compatible controller such as the Left Stick on the Wii U GamePad.
                 *
                 *      // Get instances from GamePad Controller
                 *      var gpLStick = nwf.input.WiiUGamePad.getController().leftStick;
                 *      var gpRStick = nwf.input.WiiUGamePad.getController().rightStick;
                 *
                 *      // Add listeners for the move event to be fired from the controls
                 *      gpLStick.addEventListener( nwf.events.MovementControlEvent.MOVE, onMove, this );
                 *      gpRStick.addEventListener( nwf.events.MovementControlEvent.MOVE, onMove, this );
                 *
                 *      // Handler for the MovementControls move event
                 *      function onMove( evt ) {
                 *
                 *          // Check to be sure that the movement was significant enough
                 *          if ( Math.abs( evt.movementX ) < 0.05 && Math.abs( evt.movementY ) < 0.05 ) {
                 *              return;
                 *          }
                 *
                 *          // Continue handling input
                 *      }
                 *
                 * The values returned from `MovementControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `MovementControl` class dispatches the following event:
                 *
                 * - nwf.events.MovementControlEvent.MOVE
                 *
                 * @class nwf.input.control.MovementControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 * @author Shawn Gates
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a MovementControl object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Movement along the x plane.
                 * From -1.0 to 1.0 along a screen coordinate system (where -1 on the x axis is "left").
                 * @property {Number} [movementX=0]
                 * @readonly
                 * @since 1.0
                 */
                movementX: number;
                /**
                 * Movement along the y plane.
                 * From -1.0 to 1.0 along a screen coordinate system (where -1 on the y axis is "up").
                 * @property {Number} [movementY=0]
                 * @readonly
                 * @since 1.0
                 */
                movementY: number;
                /**
                 * Movement of control mapped to the screen's x plane.
                 * Value measured in pixels. This is faster than doing `control.movementX * windowWidth` but yields the exact same result (unless `setScreenResolution()` was used, in which case it will use the value passed through that instead of the current window resolution).
                 * @property {Number} [screenX=0]
                 * @readonly
                 * @since 1.0
                 */
                screenX: number;
                /**
                 * Movement of control mapped to the screen's y plane.
                 * Value measured in pixels. This is faster than doing `control.movementY * windowHeight` but yields the exact same result (unless `setScreenResolution()` was used, in which case it will use the value passed through that instead of the current window resolution).
                 * @property {Number} [screenY=0]
                 * @readonly
                 * @since 1.0
                 */
                screenY: number;
                /**
                 * Angle of the vector from the center of the control to the X and Y position in radians.
                 * @property {Number} [angle=0]
                 * @readonly
                 * @since 1.0
                 */
                angle: number;
                /**
                 * Gets/sets whether the y values are inverted for this control.
                 *
                 * `false`: The y values decrease with downward direction of the control.
                 * This is consistent with the Cartesian coordinate system.
                 *
                 * `true`: The y values increase with downward direction of the control.
                 * This is consistent with the Screen coordinate system.
                 * @property {Boolean} [invertedY=true]
                 * @since 1.0
                 */
                invertedY: boolean;
                /**
                 * Sets the resolution used to calculate the `screenX` and
                 * `screenY` properties of the control.
                 * <p>By default the control resolution is mapped to the most appropriate resolution.
                 * For example, 854×480 for the stick controls on the GamePad and the TV's resolution for the stick on the Nunchuk.</p>
                 * @param {Number} screenWidth Number of pixels wide.
                 * @param {Number} screenHeight Number of pixels tall.
                 * @method setScreenResolution
                 * @since 1.0
                 */
                setScreenResolution(screenWidth: number, screenHeight: number): void;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class TouchControl extends nwf.events.EventDispatcher {
                /**
                 * The `TouchControl` class represents the touch screen of a compatible controller such as the Wii U GamePad.
                 *
                 * The difference between DOM mouse and touch events and the Touch Screen API is that the Touch Screen API is a native implementation that runs on the native side of the program environment.
                 * Not only does this mean better performance, but the Touch Screen API also offers convenient functionality that JavaScript developers would otherwise have to write themselves.
                 * An example of such a function is the `{@link nwf.input.control.TouchControl#screenX screenX}` and `{@link nwf.input.control.TouchControl#screenY screenY}` properties, which will automatically scale input from the Touch Screen to fit whatever resolution is passed through `{@link nwf.input.control.TouchControl#setScreenResolution setScreenResolution}`.
                 *
                 *      // Get instance from GamePad Controller
                 *      var gpTouchPanel = nwf.input.WiiUGamePad.getController().touchPanel;
                 *
                 * The values returned from `TouchControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `TouchControl` class dispatches the following events:
                 *
                 * - nwf.events.TouchControlEvent.TOUCH_END
                 * - nwf.events.TouchControlEvent.TOUCH_START
                 * - nwf.events.TouchControlEvent.UPDATE
                 *
                 * @class nwf.input.control.TouchControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a `TouchControl` object. Use nwf.input.WiiUGamePad.touchPanel instead.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * Touch determination flag. Used to determine if the touch screen is being touched and the validity of the touch data.
                 *
                 * Due to the nature of the touch screen hardware it is possible to detect a touch but the coordinate information may not be valid. In the case where touch data is invalid, the previous valid value will persist.
                 *
                 *      var gpTP = nwf.input.WiiUGamePad.getController().touchPanel;
                 *
                 *      // Quick test to pull if the touch screen is being touched
                 *      if (gpTP.touch) {
                 *
                 *          // Touch screen is touched. Touch coordinates may be recycled
                 *
                 *          if(gpTP.touch === nwf.input.control.TouchControl.TOUCH_VALID) {
                 *
                 *              // Touch screen is touched and all touch coordinates are updated
                 *
                 *          }
                 *
                 *      } else {
                 *
                 *          // Touch screen is not being touched ...
                 *
                 *      }
                 *
                 * @property {uint16} [touch=0]
                 * @readonly
                 * @since 1.2
                 */
                touch: number;
                /**
                 * Raw x coordinate of the touch screen. 0 - 4095
                 * @property {Number} [touchX=0]
                 * @readonly
                 * @since 1.0
                 */
                touchX: number;
                /**
                 * Raw y coordinate of the touch screen. 0 - 4095
                 * @property {Number} [touchY=0]
                 * @readonly
                 * @since 1.0
                 */
                touchY: number;
                /**
                 * Touch point of control mapped to the screen's x plane.
                 * Value measured in pixels.
                 * @property {Number} [screenX=0]
                 * @readonly
                 * @since 1.0
                 */
                screenX: number;
                /**
                 * Touch point of control mapped to the screen's y plane.
                 * Value measured in pixels.
                 * @property {Number} [screenY=0]
                 * @readonly
                 * @since 1.0
                 */
                screenY: number;
                /**
                 * Gets/sets whether the y values are inverted for this control.
                 *
                 * `false`: The y values decrease with the downward direction of the control.
                 * This is consistent with the Cartesian coordinate system.
                 *
                 * `true`: The y values increase with the downward direction of the control.
                 * This is consistent with the Screen coordinate system.
                 *
                 * @property {Boolean} [invertedY=true]
                 * @since 1.0
                 */
                invertedY: boolean;
                /**
                 * Sets the resolution of the screen associated with this control.
                 * These values are used to calculate the `screenX` and
                 * `screenY` properties of the control.
                 *
                 * By default, `screenWidth` and `screenHeight` are set to the GamePad display attached to the touch screen. However, by setting the resolution to that of the TV (for example) the touch screen can then be used to draw to the screen space of the TV display.
                 *
                 * @param {Number} screenWidth Number of pixels wide.
                 * @param {Number} screenHeight Number of pixels tall.
                 * @since 1.0
                 */
                setScreenResolution(screenWidth: number, screenHeight: number): void;
                /**
                 * Touch screen is not being touched.
                 * @static @constant
                 * @since 1.2
                 * @property {Number} [TOUCH_OFF=0]
                 */
                static TOUCH_OFF: number;
                /**
                 * Touch screen is being touched and all coordinates are valid and updated.
                 * @static @constant
                 * @since 1.2
                 * @property {Number} [TOUCH_VALID=1]
                 */
                static TOUCH_VALID: number;
                /**
                 * Touch screen is being touched. X coordinate data is invalid and not updated.
                 * @static @constant
                 * @since 1.2
                 * @property {Number} [TOUCH_INVALID_X=2]
                 */
                static TOUCH_INVALID_X: number;
                /**
                 * Touch screen is being touched. Y coordinate data is invalid and not updated.
                 * @static @constant
                 * @since 1.2
                 * @property {Number} [TOUCH_INVALID_Y=3]
                 */
                static TOUCH_INVALID_Y: number;
                /**
                 * Touch screen is being touched. Both X and Y coordinate data is invalid and not updated.
                 * @static @constant
                 * @since 1.2
                 * @property {Number} [TOUCH_INVALID_XY=4]
                 */
                static TOUCH_INVALID_XY: number;
            }
        }
    }
}
declare module nwf {
    module input {
        module control {
            class WeightControl extends nwf.events.EventDispatcher {
                /**
                 * The `WeightControl` class represents the weight sensor of a compatible controller.
                 *
                 *     // Get instance from Wii Balance Board
                 *     var wiiBB = nwf.input.WiiBalanceBoard.getController().tgcWeight;
                 *
                 * The values returned from `WeightControl` have been processed by the system to return a smoother range than the hardware returns directly.
                 *
                 * The `WeightControl` class dispatches the following events:
                 *
                 * - nwf.events.WeightControlEvent.WEIGHT_CHANGE
                 *
                 * @class nwf.input.control.WeightControl
                 * @extends nwf.events.EventDispatcher
                 * @author Ryan Lynd
                 */
                /**
                 * @private
                 * The `new` method is not used to get an instance of a `WeightControl` object.
                 * @method constructor
                 * @since 1.0
                 */
                constructor();
                /**
                 * Returns the controller object that contains this control.
                 * @property {nwf.input.IController} [controller={}]
                 * @readonly
                 * @since 1.0
                 */
                controller: {};
                /**
                 * When set to `true`, control values and events are disabled by the system. When set to `false`, control values and events are not disabled.
                 * When muted values return as 0.
                 *
                 * The system sets this to `true` in the following cases:
                 *
                 *  - The parent controller is disconnected or `enabled` = `false`.
                 *  - The parent controller is in a mode that doesn't support this controller.
                 *  - The user has not given permission to use this type of control or parent controller.
                 *
                 * @property {Boolean} [muted=true]
                 * @readonly
                 * @since 1.0
                 */
                muted: boolean;
                /**
                 * Returns the type of control.
                 * @property {String} [type=null]
                 * @readonly
                 * @since 1.0
                 * @see nwf.input.InputControlType
                 */
                type: string;
                /**
                 * The maximum measurable load on the sensor in Kg.
                 *
                 * @property {Number} [maxWeight=0]
                 * @readonly
                 * @since 1.2
                 */
                maxWeight: number;
                /**
                 * The measured load on the sensor calculated in Kg.
                 *
                 * @property {Number} [weight=0]
                 * @readonly
                 * @since 1.2
                 */
                weight: number;
                /**
                 * Average value calculated continuously over approximately 2 seconds' worth of samples in Kg. The value is updated continuously as it is calculated.
                 *
                 * @property {Number} [avgWeight=0]
                 * @readonly
                 * @since 1.2
                 */
                avgWeight: number;
            }
        }
    }
}
declare module nwf {
    module input {
        class IController extends nwf.events.EventDispatcher {
            /**
             * Interface class for all `nwf` Controller classes.
             *
             * _This class is for documentation purposes only._
             *
             * @class nwf.input.IController
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a controller.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * When set to `true`, input is enabled on this controller. When set to `false`, it is disabled.
             * @property {Boolean} [enabled=false]
             * @since 1.0
             */
            enabled: boolean;
            /**
             * Returns `true` if the controller is connected to the console, or returns `false` otherwise.
             * @property {Boolean} [connected=false]
             * @readonly
             * @since 1.0
             */
            connected: boolean;
            /**
             * Battery level of the controller.
             *
             * _If the controller does not have a battery, this value will be `{@link nwf.input.BatteryLevel#NO_BATTERY}`._
             * @property {int} [batteryLevel= nwf.input.BatteryLevel.NO_BATTERY]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.BatteryLevel}
             */
            batteryLevel: number;
            /**
             * Controller type.
             * @property {uint16} [type=nwf.input.ControllerType.UNKNOWN]
             * @readonly
             * @since 1.1
             * @see {@link nwf.input.ControllerType}
             */
            type: number;
            /**
             * Controller name.
             * @property {String} [name='']
             * @readonly
             * @since 1.0
             */
            name: string;
            /**
             * Converts the `IController` instance to `{@link String}`.
             * @since 1.0
             * @returns {String}
             */
            toString(): string;
            /**
             * Returns the value of the `IController` instance as a `{@link String}`.
             * @since 1.0
             * @returns {String}
             */
            valueOf(): string;
            /**
             * Sets the controllers buttons to dispatch key press events.
             * @param {Object} keyMap Object containing the buttons to be mapped to keyboard keys, i.e. `{ 'A': 'a' }`.
             * @since 1.3
             */
            setupKeyboardRemap(keyMap: any): void;
            /**
             * Fetches the currently mapped keyboard key of the provided button.
             *
             * The return value of this method will be the `keyCode` of the mapped key. If a special navigation value is set, one of the codes below will be returned:
             *
             * <table>
             * 		<tr><td> Value                 </td><td> Code    </td></tr>
             * 		<tr><td> navigation_forward_tv </td><td> <code>0x10012</code> </td></tr>
             * 		<tr><td> navigation_back_tv    </td><td> <code>0x10002</code> </td></tr>
             * 		<tr><td> navigation_refresh_tv </td><td> <code>0x10022</code> </td></tr>
             * 		<tr><td> navigation_forward_gp </td><td> <code>0x10011</code> </td></tr>
             * 		<tr><td> navigation_back_gp    </td><td> <code>0x10001</code> </td></tr>
             * 		<tr><td> navigation_refresh_gp </td><td> <code>0x10021</code> </td></tr>
             * </table>
             *
             * @param {Number} buttonValue The button to be checked. This should correspond to a value from `nwf.input.ControllerButton`.
             * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/event.keyCode">MDN event.keyCode</a>
             * @returns {Number} The `keyCode` of the keyboard key currently mapped to the button.
             * @since 1.3
             */
            getKeyboardRemap(button: number): void;
            /**
             * Removes all of the mapped keyboard characters on the controller.
             * @since 1.3
             */
            clearKeyboardRemaps(): void;
        }
    }
}
declare module nwf {
    module input {
        class WiiBalanceBoard extends nwf.input.IController {
            /**
             * Container class representing the Wii Balance Board.
             *
             * ### Working with input controls:
             *
             * The Nintendo Web Framework API maps the physical controls of a controller to simple, logical control classes.
             * From the controller class you can access the supported controls.
             *
             *      // Get an instance of the WiiBalanceBoard
             *      var balanceBoard = nwf.input.WiiBalanceBoard.getController();
             *
             *      // Keep in mind that at any given time the Wii Balance Board may or may not be connected, so always check
             *      if (!balanceBoard.connected) return;
             *
             *      // Before using the Balance Board test to be sure it is not malfunctioning
             *      if(balanceBoard.checkIdleWeight()) return;
             *
             *      // Always call `calibrateWeightControls` before listening for a weight change to be sure that the weight measurments are accurate
             *      balanceBoard.calibrateWeightControls(onCalibrateSuccess);
             *
             *      function onCalibrateSuccess( success ){
             *          if(success){
             *              // If calibration is successful
             *              // instruct the user to step onto the Balance Board
             *              // and test to be sure the weight is between minimum and maximum allowed values
             *              if(!balanceBoard.weightAboveMinimum()) return;
             *              if(!balanceBoard.weightBelowMaximum()) return;
             *
             *              // Test to be sure all of the weight sensors are returning accurately
             *              if(!balanceBoard.checkWeightControls()) return;
             *
             *              // It is now safe to use the Balance Board, so listen for a weight change event
             *              // This is done on the specific WeightControl not the WiiBalanceBoard itself
             *              balanceBoard.tgcWeight.addEventListener( nwf.events.WeightControlEvent.WEIGHT_CHANGE, onWeightChange, this );
             *          } else {
             *              // Handle the failure case
             *              console.log( '[Wii Balance Board] Calibration attempt failed!' );
             *          }
             *      }
             *
             *      function onWeightChange( evt ) {
             *          console.log( "Current Weight: " + evt.weight );
             *      }
             *
             * The `WiiBalanceBoard` class dispatches the following events:
             *
             * - nwf.events.ControllerEvent.BATTERY_LEVEL_CHANGE
             * - nwf.events.ControllerEvent.CONTROLLER_CONNECTED
             * - nwf.events.ControllerEvent.CONTROLLER_DISCONNECTED
             *
             * @class nwf.input.WiiBalanceBoard
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `WiiBalanceBoard` singleton; use `#getController` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Weight sensor in the front left area of the Wii Balance Board.
             *
             * @property {nwf.input.control.WeightControl} [frontLeftWeight]
             * @readonly
             * @since 1.2
             * @see {@link nwf.input.control.WeightControl}
             */
            frontLeftWeight: control.WeightControl;
            /**
             * Weight sensor in the front right area of the Wii Balance Board.
             *
             * @property {nwf.input.control.WeightControl} [frontRightWeight]
             * @readonly
             * @since 1.2
             * @see {@link nwf.input.control.WeightControl}
             */
            frontRightWeight: control.WeightControl;
            /**
             * Weight sensor in the back left area of the Wii Balance Board.
             *
             * @property {nwf.input.control.WeightControl} [backLeftWeight]
             * @readonly
             * @since 1.2
             * @see {@link nwf.input.control.WeightControl}
             */
            backLeftWeight: control.WeightControl;
            /**
             * Weight sensor in the back right area of the Wii Balance Board.
             *
             * @property {nwf.input.control.WeightControl} [backRightWeight]
             * @readonly
             * @since 1.2
             * @see {@link nwf.input.control.WeightControl}
             */
            backRightWeight: control.WeightControl;
            /**
             * Represents an average weight of all sensors that has been corrected for both temperature and gravitational acceleration.
             * This value is calulated and returned every 2 seconds.
             *
             * Always use this `WeightControl`'s values when accurate measurements are required.
             *
             * @property {nwf.input.control.WeightControl} [tgcWeight]
             * @readonly
             * @since 1.2
             * @see {@link nwf.input.control.WeightControl}
             */
            tgcWeight: control.WeightControl;
            /**
             * Disconnects the controller.
             * <p class="note">Reconnecting of the controller is initiated by the user.</p>
             * @since 1.2
             */
            disconnect(): void;
            /**
             * First collects temperature and gravitational acceleration data and then performs a zero-point calibration of all the `WeightControl` sensors and calls a callback function with a boolean for its parameter.
             *
             * __To Use:__ Direct the user to remove any load from the Wii Balance Board before executing this function.
             *
             * __Note:__ _It is necessary to calibrate the Wii Balance Board each time before an accurate measurement is to be collected on the #tgcWeight control._
             * @param {Function} calibrateCallback Callback function that returns when the calibration ends.
             * @param {Boolean} calibrateCallback.success Set to `true` if the calibration process was succesful, or `false` if it was not.
             * @returns {Boolean} Returns `true` if the calibration process starts successfully, or `false` if an error is generated.
             *                    An error occurs when the control is muted or is already being calibrated.
             * @since 1.2
             * @async
             * @see nwf.input.control.WeightControl#muted
             */
            calibrateWeightControls(calibrateCallback: any): boolean;
            /**
             * Checks whether the weight on the Balance Board exceeds 15.4 lbs.
             *
             * __Note:__ _This should be called before the user is instructed to stand on the Balance Board._
             *
             * @returns {Boolean} Returns `false` if the weight doesn't exceed the limit, or `true` if it does.
             * @since 1.2
             */
            checkIdleWeight(): boolean;
            /**
             * Checks to be sure that the current weight is above the minimum weight of 2 kg.
             *
             * @returns {Boolean} Returns `true` if the weight is above the minimum, or `false` if it is not.
             * @since 1.2
             */
            weightAboveMinimum(): boolean;
            /**
             * Checks to be sure that the current weight is below the maximum weight 150 kg.
             *
             * @returns {Boolean} Returns `true` if the weight is below the maximum, or `false` if it is not.
             * @since 1.2
             */
            weightBelowMaximum(): boolean;
            /**
             * Checks to be sure that the current weight of each weight sensor has changed by 2 kg from the zero-point.
             *
             * @returns {Boolean} Returns `true` if the weight on all sensors has changed by the required amount, or `false` otherwise.
             * @since 1.2
             */
            checkWeightControls(): boolean;
            /**
             * This is not inherited by the Wii Balance Board.
             * @hide
             * @since 1.2
             */
            setupKeyboardRemap(): void;
            /**
             * This is not inherited by the Wii Balance Board.
             * @hide
             * @since 1.2
             */
            getKeyboardRemap(): void;
            /**
             * This is not inherited by the Wii Balance Board.
             * @hide
             * @since 1.2
             */
            clearKeyboardRemaps(): void;
            /**
             * Creates a "singleton" instance of the Wii Balance Board. Only one Wii Balance Board can be connected to the Wii U at a time.
             *
             * Check the `#connected` property to verify the controller is connected before accessing properties or methods.
             * @method getController
             * @returns {nwf.input.WiiBalanceBoard} The `WiiBalanceBoard` singleton instance.
             * @since 1.2
             * @static
             */
            static getController(): WiiBalanceBoard;
            /**
             * Method to test for class availability.
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.2
             * @static
             */
            static isSupported(): boolean;
            /** @ignore */
            static s_controller0: WiiBalanceBoard;
        }
    }
}
declare module nwf {
    module input {
        class Nunchuk extends nwf.input.IController {
            /**
             * Container class representing the Nunchuk controller extension.
             *
             *     // Get instance when Nunchuk is plugged into the extension port of the player 1 Wii Remote
             *     var player1Nunchuk = nwf.input.WiiRemote.getController( 0 ).extensionController;
             *
             * @class nwf.input.Nunchuk
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `Nunchuk` singleton; use `nwf.input.WiiRemote.extensionController` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Returns the parent controller object that controls this controller.
             * @property {nwf.input.IController} [controller=nwf.input.IController]
             * @readonly
             * @since 1.0
             */
            controller: IController;
            /**
             * Button control object of the Nunchuk.
             * @property {nwf.input.control.ButtonControl} [buttons=null]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.ButtonControl}
             */
            buttons: any;
            /**
             * Stick control (`MovementControl`) object of the Nunchuk.
             * @property {nwf.input.control.MovementControl} [stick=null]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.MovementControl}
             */
            stick: any;
            /**
             * Accelerometer control object of the Nunchuk.
             * @property {nwf.input.control.AccelerometerControl} [accelerometer=null]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.AccelerometerControl}
             */
            accelerometer: any;
        }
    }
}
declare module nwf {
    module input {
        class ClassicController extends nwf.input.IController {
            /**
             * Container class representing the Classic Controller and Classic Controller Pro controller extensions.
             *
             *     // Get instance when Classic Controller is plugged into the extension port of the player 1 Wii Remote
             *     var player1Classic = nwf.input.WiiRemote.getController( 0 ).extensionController;
             *
             * @class nwf.input.ClassicController
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `ClassicController` singleton; use `nwf.input.WiiRemote.extensionController` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Returns the parent controller object that controls this controller.
             * @property {nwf.input.IController} [controller=nwf.input.IController]
             * @readonly
             * @since 1.0
             */
            controller: IController;
            /**
             * Button control object of the Classic Controller.
             * @property {nwf.input.control.ButtonControl} [buttons=nwf.input.control.ButtonControl]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.ButtonControl}
             */
            buttons: control.ButtonControl;
            /**
             * +Control Pad directional control object of the Classic Controller.
             * @property {nwf.input.control.DirectionControl} [controlPad=nwf.input.control.DirectionControl]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.DirectionControl}
             */
            controlPad: control.DirectionControl;
            /**
             * Left stick control (`MovementControl`) object of the Classic Controller.
             * @property {nwf.input.control.MovementControl} [leftStick=nwf.input.control.MovementControl]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.MovementControl}
             */
            leftStick: control.MovementControl;
            /**
             * Right stick control (`MovementControl`) object of the Classic Controller.
             * @property {nwf.input.control.MovementControl} [rightStick=nwf.input.control.MovementControl]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.MovementControl}
             */
            rightStick: control.MovementControl;
        }
    }
}
declare module nwf {
    module input {
        class WiiRemote extends nwf.input.IController {
            /**
             * Container class representing the Wii Remote.
             *
             * ### Working with input controls:
             * The Nintendo Web Framework API maps the physical controls of a controller to simple, logical control classes.
             * From the controller class you can access the supported controls.
             *
             *      // Get instance of controller 0, which is Player 1 (controller array is zero-based)
             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *
             *      // Keep in mind that any given controller may or may not be connected, so always check
             *      if (!player1.connected) return;
             *
             *      // Listen for the A Button
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onRemotePress, this );
             *
             *      function onRemotePress( evt ) {
             *          console.log( "Raw button value: " + evt.button );
             *          if (evt.button === nwf.input.ControllerButton.WII_REMOTE_A) {
             *              console.log( "Player 1 pressed A!" );
             *         }
             *      }
             *
             *
             * The `WiiRemote` class dispatches the following events:
             *
             * - nwf.events.ControllerEvent.BATTERY_LEVEL_CHANGE
             * - nwf.events.ControllerEvent.CONTROLLER_CONNECTED
             * - nwf.events.ControllerEvent.CONTROLLER_DISCONNECTED
             * - nwf.events.ControllerEvent.EXTENSION_CONTROLLER_ADDED
             * - nwf.events.ControllerEvent.EXTENSION_CONTROLLER_REMOVED
             * - nwf.events.ControllerEvent.MPLS_ADDED
             * - nwf.events.ControllerEvent.MPLS_REMOVED
             *
             * @class nwf.input.WiiRemote
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `WiiRemote` singleton; use `#getController` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Wii Remote Channel (0-3);
             * @property {int} [channel=0]
             * @readonly
             * @since 1.0
             */
            channel: number;
            /**
             * Changes the data format mode of the Wii Remote.
             *
             * Based on the mode, data for specific controls will be enabled or disabled.
             *
             * Accessing a control that is incompatible with a mode value will throw a `WiiRemoteModeError`.
             *
             * @property {int} [mode=nwf.input.WiiRemote.MODE_LITE]
             * @since 1.0
             * @see nwf.input.WiiRemote.MODE_DPD
             * @see nwf.input.WiiRemote.MODE_GYRO
             * @see nwf.input.WiiRemote.MODE_LITE
             * @see nwf.input.WiiRemote.MODE_FULL
             */
            mode: number;
            /**
             * Peripheral controller plugged into the extension port of this Wii Remote.
             * Depending on which peripheral controller is plugged in, the value of this property can be an instance of either `{@link nwf.input.Nunchuk}` or `{@link nwf.input.ClassicController}`.
             * Only available if an `extensionController` is attached, otherwise returns `null`.
             * @property {nwf.input.IController} [extensionController=null]
             * @readonly
             * @see nwf.input.ClassicController
             * @see nwf.input.Nunchuk
             * @see nwf.events.ControllerEvent.EXTENSION_CONTROLLER_ADDED
             * @see nwf.events.ControllerEvent.EXTENSION_CONTROLLER_REMOVED
             * @since 1.0
             */
            extensionController: void;
            /**
             * Button control object of the Wii Remote. Add event listeners to this object, not the Wii Remote itself, in order to grab input values:
             *
             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onRemotePress, this );
             *
             * @property {nwf.input.control.ButtonControl} [buttons]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.ButtonControl}
             */
            buttons: control.ButtonControl;
            /**
             * Access to the +Control Pad, the directional control object of the Wii Remote.
             *
             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *      player1.controlPad.addEventListener( nwf.events.DirectionControlEvent.DIRECTION_CHANGE, onDirectionChange, this );
             *
             * @property {nwf.input.control.DirectionControl} [controlPad]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.DirectionControl}
             */
            controlPad: control.DirectionControl;
            /**
             * Pointer control (DPD) object of the Wii Remote. The controller's `#mode` property must be set to `#MODE_DPD` or `#MODE_FULL`:

             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *      // The cursor will only return valid values after DPD mode is set like so:
             *      player1.mode = nwf.input.WiiRemote.MODE_DPD;
             *      var remote1Cursor = player1.cursor;
             *
             * @property {nwf.input.control.DPDControl} [cursor]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.DPDControl}
             */
            cursor: control.DPDControl;
            /**
             * Accelerometer control object of the Wii Remote.
             *
             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *      player1.accelerometer.addEventListener( nwf.events.AccelerometerControlEvent.UPDATE, onAccelerometerUpdate, this );
             *
             * @property {nwf.input.control.AccelerometerControl} [accelerometer]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.AccelerometerControl}
             */
            accelerometer: control.AccelerometerControl;
            /**
             * Gyroscope control object of the Wii Remote. Only available on MotionPlus Wii Remote controllers (either the attachment or built-in). And the controller's `#mode` property must be set to `#MODE_GYRO` or `#MODE_FULL`:
             *
             *      var player1 = nwf.input.WiiRemote.getController( nwf.input.WiiRemote.REMOTE_1 );
             *      // The gyro will only return valid values after gyro mode is set like so:
             *      player1.mode = nwf.input.WiiRemote.MODE_GYRO;
             *      var remote1Gyro = player1.gyroscope;
             *
             * @property {nwf.input.control.GyroscopeControl} [gyroscope]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.GyroscopeControl}
             */
            gyroscope: control.GyroscopeControl;
            /**
             * Disconnects the controller.
             * <p class="note">Reconnecting of the controller is initiated by the user.</p>
             * @since 1.0
             */
            disconnect(): void;
            /**
             * Vibrates the Wii Remote.
             *
             * @param {Number} [on=50]  Duration, in milliseconds, to rumble the motor. Max 5000.
             * @param {Number} [off=50]     Duration, in milliseconds, to rest the motor. Max 5000.
             * @param {Boolean} [override=false]    If `true`, subsequent calls to `startVibrate` will clear the previous command and start a new rumble sequence, or if `false` subsequent calls to `startVibrate` will not rumble the controller unless the previous call is fully completed.
             * @since 1.0
             */
            startVibrate(on?: number, off?: number, override?: boolean): void;
            /**
             * Unconditionally stops any occurring vibration.
             * @since 1.0
             */
            stopVibrate(): void;
            /**
             * Definition for Wii Remote 1.
             * @static @constant
             * @since 1.0
             * @property {uint8} [REMOTE_1=0]
             */
            static REMOTE_1: number;
            /**
             * Definition for Wii Remote 2.
             * @static @constant
             * @since 1.0
             * @property {uint8} [REMOTE_2=1]
             */
            static REMOTE_2: number;
            /**
             * Definition for Wii Remote 3.
             * @static @constant
             * @since 1.0
             * @property {uint8} [REMOTE_3=2]
             */
            static REMOTE_3: number;
            /**
             * Definition for Wii Remote 4.
             * @static @constant
             * @since 1.0
             * @property {uint8} [REMOTE_4=3]
             */
            static REMOTE_4: number;
            /**
             * Only Buttons, Accelerometer, accessories (when available) and +Control Pad controls are active.
             *
             * This is the default mode of the controller.
             *
             * The maximum data rate of any control is about 200Hz in this mode.
             *
             * @static @constant
             * @since 1.0
             * @property {uint8} [MODE_LITE=0]
             */
            static MODE_LITE: number;
            /**
             * Buttons, +Control Pad, Accelerometer, accessories (when available) and Pointer controls are active.
             *
             * The maximum data rate of any control is about 100Hz in this mode.
             *
             * @static @constant
             * @since 1.0
             * @deprecated 1.6 Please use `#MODE_DPD` instead.
             * @property {uint8} [MODE_NORMAL=1]
             */
            static MODE_NORMAL: number;
            /**
            * Buttons, +Control Pad, Accelerometer, accessories (when available) and Pointer controls are active.
            *
            * The maximum data rate of any control is about 100Hz in this mode.
            *
            * @static @constant
            * @since 1.6
            * @property {uint8} [MODE_DPD=1]
            */
            static MODE_DPD: number;
            /**
            * Buttons, +Control Pad, Accelerometer, accessories (when available) and Gyroscope controls are active.
            *
            * __Note:__ The Gyroscope is only available in MotionPlus attachments (or built-in for newer Wii Remote controllers, which show the "Wii MotionPlus INSIDE" label on the front and bottom of the device).
            *
            * The maximum data rate of any control is about 100Hz in this mode.
            *
            * @static @constant
            * @since 1.6
            * @property {uint8} [MODE_GYRO=2]
            */
            static MODE_GYRO: number;
            /**
             * All Controls are active: Buttons, +Control Pad, accessories (when available), Pointer, Accelerometer, and Gyroscope are active.
             *
             * __Note:__ The Gyroscope is only available in MotionPlus attachments (or built-in for newer Wii Remote controllers, which show the "Wii MotionPlus INSIDE" label on the front and bottom of the device).
             *
             * The maximum data rate of any control is about 100Hz in this mode.
             *
             * @static @constant
             * @since 1.0
             * @property {uint8} [MODE_FULL=3]
             */
            static MODE_FULL: number;
            /**
             * Enables and disables all default controller actions for Wii Remote controllers.
             *
             * If `true`, all browser events (mouseEvents, scrollEvents, navEvents) are enabled. If `false`, they are not enabled.
             * @property {Boolean} [browserActionsEnabled=true]
             * @since 1.0
             * @static
             */
            browserActionsEnabled: boolean;
            /**
             * Enables and disables default mouse functionality for Wii Remote controllers.
             *
             * This will render the default cursor to the TV display and dispatch DOM mouse events.
             *
             * If `true`, the mouse is controlled with the Wii Remote DPD. If `false`, it is not.
             *
             * @property {Boolean} [mouseEnabled=true]
             * @since 1.0
             * @static
             */
            mouseEnabled: boolean;
            /**
             * Enables and disables default scrolling functionality for Wii Remote controllers.
             *
             * If `true`, the scroll bar is controlled with the +Control Pad. If `false`, it is not.
             *
             * @property {Boolean} [scrollEnabled=true]
             * @since 1.0
             * @static
             * @deprecated 1.6
             */
            scrollEnabled: boolean;
            /**
             * Enables and disables default navigation functionality for Wii Remotes.
             *
             * If `true`, the browser's "back" and "forward" commands are mapped to the - Button and + Button, respectively. Additionally, pressing the 1 Button reloads the page but does not reflect changes to the source file, and pressing the 2 Button halts loading of the page. If `false`, this is not the case.
             *
             * @property {Boolean} [navigationEnabled=true]
             * @since 1.0
             * @static
             * @removed 1.7.1
             */
            navigationEnabled: boolean;
            /**
             * Creates a "pseudo-singleton" instance of a channel of the Wii Remote.
             *
             * Check the `#connected` property to verify the controller is connected before accessing properties or methods.
             * @method getController
             * @param {Number} [remoteChannel=nwf.input.WiiRemote.REMOTE_1] Wii Remote channel (0-3).
             * @returns {nwf.input.WiiRemote} The `WiiRemote` singleton instance of a specific channel.
             * @since 1.0
             * @static
             */
            static getController(remoteChannel?: number): WiiRemote;
            /**
             * Method to test for class availability.
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported: () => boolean;
            /** @ignore */
            static s_wiiRemote0: WiiRemote;
            /** @ignore */
            static s_wiiRemote1: WiiRemote;
            /** @ignore */
            static s_wiiRemote2: WiiRemote;
            /** @ignore */
            static s_wiiRemote3: WiiRemote;
        }
    }
}
declare module nwf {
    module input {
        class WiiUGamePad extends nwf.input.IController {
            private _buttons;
            private _controlPad;
            private _gyroscope;
            private _accelerometer;
            private _touchPanel;
            private _rightStick;
            private _leftStick;
            /**
             * Container class representing the Wii U GamePad (sometimes referred to as the GamePad).
             *
             * ### Working with input controls:
             * The Nintendo Web Framework API maps the physical controls of a controller to simple, logical control classes.
             * From the controller class you can access the supported controls.
             *
             *      // Get instance
             *      var player1 = nwf.input.WiiUGamePad.getController();
             *
             *      // Keep in mind that any given controller may or may not be connected, so always check
             *      if (!player1.connected) return;
             *
             *      // Listen for the A Button
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onGamePadPress, this );
             *
             *      function onGamePadPress( evt ) {
             *          console.log( "Raw button value: " + evt.button );
             *          if (evt.button === nwf.input.ControllerButton.GAMEPAD_A) {
             *          console.log( "GamePad Player 1 pressed A!" );
             *          }
             *      }
             *
             * The `WiiUGamePad` class dispatches the following events:
             *
             * - nwf.events.ControllerEvent.BATTERY_LEVEL_CHANGE
             * - nwf.events.ControllerEvent.CONTROLLER_CONNECTED
             * - nwf.events.ControllerEvent.CONTROLLER_DISCONNECTED
             *
             * @class nwf.input.WiiUGamePad
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
                * @private
                * The `new` method is not used to get an instance of the `WiiUGamePad` singleton; use `#getController` instead.
                * @method constructor
                * @since 1.0
                */
            constructor();
            /**
             * Wii U GamePad Controller Channel (always 0).
             * @property {int} [channel=0]
             * @readonly
             * @since 1.0
             */
            channel: number;
            /**
             * Returns `true` if the Wii U GamePad is currently charging, or `false` if it is not.
             * @property {Boolean} [isCharging=false]
             * @readonly
             * @since 1.2
             */
            isCharging: boolean;
            /**
             * Button control object of the Wii U GamePad. Add event listeners to this object, not the Wii U GamePad itself, in order to grab input values:
             *
             *      var player1 = nwf.input.WiiUGamePad.getController( nwf.input.WiiUGamePad.GAMEPAD_1 );
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onRemotePress, this );
             *
             * @property {nwf.input.control.ButtonControl} [buttons]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.ButtonControl}
             */
            buttons: any;
            /**
             * +Control Pad directional control object of the Wii U GamePad.
             * @property {nwf.input.control.DirectionControl} [controlPad]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.DirectionControl}
             */
            controlPad: any;
            /**
             * Left stick control (`MovementControl`) object of the Wii U GamePad.
             * @property {nwf.input.control.MovementControl} [leftStick]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.MovementControl}
             */
            leftStick: any;
            /**
             * Right stick control (`MovementControl`) object of the Wii U GamePad.
             * @property {nwf.input.control.MovementControl} [rightStick]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.MovementControl}
             */
            rightStick: any;
            /**
             * Touch screen control object of the Wii U GamePad. This provides direct access to the touch screen properties which offer convenient methods as well as bypassing the DOM event system, making it faster to access. Note that the touch screen is a single-point-of-contact device with no further data, so DOM touch events are never fired.
             * @property {nwf.input.control.TouchControl} [touchPanel]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.TouchControl}
             */
            touchPanel: any;
            /**
             * Accelerometer control object of the Wii U GamePad.
             * @property {nwf.input.control.AccelerometerControl} [accelerometer]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.AccelerometerControl}
             */
            accelerometer: any;
            /**
             * Gyroscope control object of the Wii U GamePad.
             * @property {nwf.input.control.GyroscopeControl} [gyroscope]
             * @readonly
             * @since 1.0
             * @see {@link nwf.input.control.GyroscopeControl}
             */
            gyroscope: any;
            /**
             * When set to `true`, the GamePad Sensor Bar LED is powered on, or when set to `false`, it is not. By default, the Sensor Bar LED is off (`false`).
             * @property {Boolean} [sensorBarEnabled=false]
             * @since 1.1
             */
            sensorBarEnabled: boolean;
            /**
             * Helper function to return the GamePad Display. Use this method to get access to the `{@link nwf.display.GamePadDisplay}` associated with this controller.
             *
             * @returns {nwf.display.GamePadDisplay} GamePad Display Object.
             * @since 1.0
             */
            getDisplay(): display.GamePadDisplay;
            /**
             * Reference to the GamePad Camera.
             *
             * @returns {nwf.media.Camera} `WIIUCamera` instance.
             * @since 1.0
             */
            getCamera(): media.Camera;
            /**
             * Reference to the GamePad Microphone.
             *
             * @returns {nwf.media.Microphone} `WIIUMicrophone` instance.
             * @since 1.5
             */
            getMicrophone(): any;
            /**
             * Resets the origin point of the `#leftStick` and `#rightStick` controls.
             *
             * @since 1.7
             */
            setStickOrigin(): any;
            /**
             * Vibrates the Wii U GamePad.
             *
             * @param {Number} [on=50]  Duration, in milliseconds, to rumble the motor. Max 5000.
             * @param {Number} [off=50]     Duration, in milliseconds, to rest the motor. Max 5000.
             * @param {Boolean} [override=false]    If `true`, subsequent calls to `startVibrate` will clear the previous command and start a new rumble sequence, or if `false` subsequent calls to `startVibrate` will not rumble the controller unless the previous call is fully completed.
             * @since 1.0
             */
            startVibrate(on?: number, off?: number, override?: boolean): void;
            /**
             * Unconditionally stops any occurring vibration.
             * @since 1.0
             */
            stopVibrate(): void;
            /**
             * Enables and disables all default controller actions for the GamePad.
             *
             * If `true`, all browser events (mouseEvents, scrollEvents, navEvents) are enabled. If `false`, they are not enabled.
             * @property {Boolean} [browserActionsEnabled=true]
             * @since 1.0
             * @static
             */
            browserActionsEnabled: boolean;
            /**
             * Enables and disables default mouse functionality for the GamePad.
             *
             * If `true`, the mouse is simulated on the touch screen. If `false`, it is not.
             *
             * @property {Boolean} [mouseEnabled=true]
             * @since 1.0
             * @static
             */
            mouseEnabled: boolean;
            /**
             * Enables and disables default scrolling functionality for the GamePad.
             *
             * If `true`, the position of the page (scrolling) is controlled with the Left Stick. If `false`, it is not.
             *
             * **Note:** If the Focus Navigation feature is enabled, the +Control Pad can be used for scrolling even if this property is set to `false`.
             *
             * @property {Boolean} [scrollEnabled=true]
             * @since 1.0
             * @static
             */
            scrollEnabled: boolean;
            /**
             * Enables and disables default navigation functionality for the GamePad. Additionally, pressing the X Button reloads the page but does not reflect changes to the source file, and pressing the Y Button halts loading of the page.
             *
             * If `true`, the Browser "back" and "forward" commands are mapped to the - Button and + Button, respectively. If `false`, they are not.
             *
             * @property {Boolean} [navigationEnabled=true]
             * @since 1.0
             * @static
             * @removed 1.7.1
             */
            navigationEnabled: boolean;
            /**
             * Creates a `singleton` instance of the `WiiUGamePad`.
             *
             * Check the `#connected` property to verify the controller is connected before accessing properties or methods.
             *
             * @method getController
             * @returns {nwf.input.WiiUGamePad} The `WiiUGamePad` singleton instance.
             * @since 1.0
             * @static
             */
            static getController(): WiiUGamePad;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported(): boolean;
            /** @ignore */
            static s_gp: WiiUGamePad;
        }
    }
}
declare module nwf {
    module input {
        class WiiUProController extends nwf.input.IController {
            /**
             * Container class representing the Wii U Pro Controller.
             *
             * ### Working with input controls:
             * The Nintendo Web Framework API maps the physical controls of a controller to simple, logical control classes.
             * From the controller class you can access the supported controls.
             *
             *      // Get instance
             *      var player1 = nwf.input.WiiUProController.getController(); // Defaults to channel 0, aka WII_U_PRO_CONTROLLER_1
             *      // Keep in mind that any given controller may or may not be connected, so always check
             *      if (!player1.connected) return;
             *      // Listen for the A Button
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onProControllerPress, this );
             *
             *      function onProControllerPress( evt ) {
             *          console.log( "Raw button value: " + evt.button );
             *          if (evt.button === nwf.input.ControllerButton.PRO_A) {
             *              console.log( "Pro Controller Player 1 pressed A!" );
             *          }
             *      }
             *
             * The `WiiUProController` class dispatches the following events:
             *
             * - nwf.events.ControllerEvent.BATTERY_LEVEL_CHANGE
             * - nwf.events.ControllerEvent.CONTROLLER_CONNECTED
             * - nwf.events.ControllerEvent.CONTROLLER_DISCONNECTED
             *
             * @class nwf.input.WiiUProController
             * @extends nwf.input.IController
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `WiiUProController` singleton; use `#getController` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Wii U Pro Controller Channel (0-3).
             * @property {int} [channel=0]
             * @readonly
             * @since 1.0
             */
            channel: number;
            /**
             * Returns `true` if the Wii U Pro Controller is currently charging, or `false` if it is not.
             * @property {Boolean} [isCharging=false]
             * @readonly
             * @since 1.2
             */
            isCharging: boolean;
            /**
             * Button control object of the Wii U Pro Controller. Add event listeners to this object, not the Wii U Pro Controller itself, in order to grab input values:
             *
             *      var player1 = nwf.input.WiiUProController.getController( nwf.input.WiiUProController.WII_U_PRO_CONTROLLER_1 );
             *      player1.buttons.addEventListener( nwf.events.ButtonControlEvent.PRESS, onProControllerPress, this );
             *
             * @property {nwf.input.control.ButtonControl} [buttons=nwf.input.control.ButtonControl]
             * @readonly
             * @see {@link nwf.input.control.ButtonControl}
             * @since 1.4
             */
            buttons: control.ButtonControl;
            /**
             * +Control Pad directional control object of the Wii U Pro Controller.
             * @property {nwf.input.control.DirectionControl} [controlPad=nwf.input.control.DirectionControl]
             * @readonly
             * @see {@link nwf.input.control.DirectionControl}
             * @since 1.4
             */
            controlPad: control.DirectionControl;
            /**
             * Left stick control (`MovementControl`) object of the Wii U Pro Controller.
             * @property {nwf.input.control.MovementControl} [leftStick=nwf.input.control.MovementControl]
             * @readonly
             * @see {@link nwf.input.control.MovementControl}
             * @since 1.4
             */
            leftStick: control.MovementControl;
            /**
             * Right stick control (`MovementControl`) object of the Wii U Pro Controller.
             * @property {nwf.input.control.MovementControl} [rightStick=nwf.input.control.MovementControl]
             * @see {@link nwf.input.control.MovementControl}
             * @readonly
             * @since 1.4
             */
            rightStick: control.MovementControl;
            /**
             * Disconnects the controller.
             * <p class="note">Reconnecting of the controller is initiated by the user.</p>
             * @since 1.9.0
             */
            disconnect(): void;
            /**
             * Vibrates the Wii U Pro Controller.
             *
             * @param {Number} [on=50]  Duration, in milliseconds, to rumble the motor. Max 5000.
             * @param {Number} [off=50]     Duration, in milliseconds, to rest the motor. Max 5000.
             * @param {Boolean} [override=false]    If `true`, subsequent calls to `startVibrate` will clear the previous command and start a new rumble sequence, or if `false` subsequent calls to `startVibrate` will not rumble the controller unless the previous call is fully completed.
             * @since 1.0
             */
            startVibrate(on?: number, off?: number, override?: boolean): void;
            /**
             * Unconditionally stops any occurring vibration.
             * @since 1.0
             */
            stopVibrate(): void;
            /**
             * Definition for Pro Controller 1.
             * @static @constant
             * @since 1.4
             * @property {uint8} [WII_U_PRO_CONTROLLER_1=0]
             */
            WII_U_PRO_CONTROLLER_1: number;
            /**
             * Definition for Pro Controller 2.
             * @static @constant
             * @since 1.4
             * @property {uint8} [WII_U_PRO_CONTROLLER_2=1]
             */
            WII_U_PRO_CONTROLLER_2: number;
            /**
             * Definition for Pro Controller 3.
             * @static @constant
             * @since 1.4
             * @property {uint8} [WII_U_PRO_CONTROLLER_3=2]
             */
            WII_U_PRO_CONTROLLER_3: number;
            /**
             * Definition for Pro Controller 4.
             * @static @constant
             * @since 1.4
             * @property {uint8} [WII_U_PRO_CONTROLLER_4=3]
             */
            WII_U_PRO_CONTROLLER_4: number;
            /**
             * Enables and disables default scrolling functionality for the Wii U Pro Controller on the first channel.
             *
             * If `true`, the position of the page (scrolling) is controlled with the Left Stick. If `false`, it is not.
             *
             * @property {Boolean} [scrollEnabled=true]
             * @since 1.9.0
             * @static
             */
            scrollEnabled: boolean;
            /**
             * Creates a "pseudo-singleton" instance of a channel of the `WiiUProController`.
             *
             * Check the `connected` property to verify the controller is connected before accessing properties or methods.
             *
             * @method getController
             * @param {int} [remoteChannel=WII_U_PRO_CONTROLLER_1] WiiU Pro Controller channel (0-3).
             * @returns {nwf.input.WiiUProController} The `WiiUProController` singleton instance of a specific channel. Defaults to the `WiiUProController` singleton instance of channel 0.
             * @since 1.4
             * @static
             */
            static getController(remoteChannel?: number): WiiUProController;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.4
             * @static
             */
            static isSupported(): boolean;
            /** @ignore */
            static s_pro0: WiiUProController;
            /** @ignore */
            static s_pro1: WiiUProController;
            /** @ignore */
            static s_pro2: WiiUProController;
            /** @ignore */
            static s_pro3: WiiUProController;
        }
    }
}
declare module nwf {
    module events {
        class SoftwareKeyboardEvent extends Event {
            /**
             * Defines events dispatched by the `{@link nwf.input.SoftwareKeyboard}` class when Nintendo Web Framework generated notifications occur.
             *
             * @see {@link nwf.input.SoftwareKeyboard}
             * @class nwf.events.SoftwareKeyboardEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the Software Keyboard opening or closing animation begins.
             *
             * @property {String} [ANIMATION_START='animationStart']
             * @since 1.6
             * @static @constant
             */
            static ANIMATION_START: string;
            /**
             * Dispatched when the Software Keyboard opening or closing animation ends.
             *
             * @property {String} [ANIMATION_END='animationEnd']
             * @since 1.6
             * @static @constant
             */
            static ANIMATION_END: string;
        }
    }
}
declare module nwf {
    module input {
        /**
         * @enum nwf.input.SoftwareKeyboardInvalidChars
         * @author Cory O'Regan
         * @author Shawn Gates
         */
        var SoftwareKeyboardInvalidChars: {
            INVALID_CHAR_ATMARK: number;
            INVALID_CHAR_BACKSLASH: number;
            INVALID_CHAR_EUROMARK: number;
            INVALID_CHAR_HEART: number;
            INVALID_CHAR_LINEFEED: number;
            INVALID_CHAR_PERCENT: number;
            INVALID_CHAR_NUMERIC: number;
            INVALID_CHAR_SLASH: number;
            INVALID_CHAR_SPACE: number;
        };
    }
}
declare module nwf {
    module input {
        /**
         * Defines constants for input control types.
         *
         * @enum nwf.input.SoftwareKeyboardFlags
         * @author Cory O'Regan
         * @author Shawn Gates
         */
        var SoftwareKeyboardFlags: {
            FLAG_QWERTY_JP: number;
            FLAG_QWERTY_US_ENG: number;
            FLAG_QWERTY_US_FRA: number;
            FLAG_QWERTY_US_SPA: number;
            FLAG_QWERTY_US_POR: number;
            FLAG_QWERTY_EU_ENG: number;
            FLAG_QWERTY_EU_FRA: number;
            FLAG_QWERTY_EU_DEU: number;
            FLAG_QWERTY_EU_ITA: number;
            FLAG_QWERTY_EU_SPA: number;
            FLAG_QWERTY_EU_NLD: number;
            FLAG_QWERTY_EU_POR: number;
            FLAG_QWERTY_EU_RUS: number;
            FLAG_50ON: number;
            FLAG_CELL_PHONE: number;
            FLAG_HAND: number;
            FLAG_SIGN_JP: number;
            FLAG_SIGN_LATIN: number;
            FLAG_SIGN_US: number;
            FLAG_ALL: number;
        };
    }
}
declare module nwf {
    module input {
        /**
         * @enum nwf.input.SoftwareKeyboardType
         * @author Cory O'Regan
         * @author Shawn Gates
         */
        var SoftwareKeyboardType: {
            TYPE_QWERTY_JP: number;
            TYPE_QWERTY_US_ENG: number;
            TYPE_QWERTY_US_FRA: number;
            TYPE_QWERTY_US_SPA: number;
            TYPE_QWERTY_US_POR: number;
            TYPE_QWERTY_EU_ENG: number;
            TYPE_QWERTY_EU_FRA: number;
            TYPE_QWERTY_EU_DEU: number;
            TYPE_QWERTY_EU_ITA: number;
            TYPE_QWERTY_EU_SPA: number;
            TYPE_QWERTY_EU_NLD: number;
            TYPE_QWERTY_EU_POR: number;
            TYPE_QWERTY_EU_RUS: number;
            TYPE_50ON: number;
            TYPE_CELL_PHONE: number;
            TYPE_HAND: number;
            TYPE_SIGN_JP: number;
            TYPE_SIGN_LATIN: number;
            TYPE_SIGN_US: number;
        };
    }
}
declare module nwf {
    module input {
        class SoftwareKeyboard extends nwf.events.EventDispatcher {
            /**
             * Class for invoking the Wii U Software Keyboard.
             *
             * The example below invokes the half-screen keyboard, with numbers only, on the GamePad display:
             *
             *      var keyboard = nwf.input.SoftwareKeyboard;
             *      var ops = {
             *          'display': nwf.input.SoftwareKeyboard.DISPLAY_GAMEPAD,
             *          'mode': nwf.input.SoftwareKeyboard.MODE_NUMERIC,
             *          'fullscreen': false
             *      };
             *
             *      // The SoftwareKeyboard class will throw an error if it is invoked again while it is already open
             *      // So it is best to wrap the invoke call in an error handler
             *      try{
             *          // The `onKeyPress` example function can be found below
             *          keyboard.invoke( onKeyPress, ops, onValidation );
             *      }catch(err){
             *          // Handle the error here
             *      }
             *
             * Below is a callback example for taking input from a half-screen keyboard:
             *
             *      function onKeyPress( options ) {
             *          // 'options' is an Object passed to this callback function by the software keyboard
             *          var txt = options.text; // options.text returns JS text, not HTML
             *
             *          var userSelected = options.user_select;
             *          switch (userSelected) {
             *              case keyboard.USER_OK:
             *                  // You should already be capturing input into a field every press,
             *                  // But perhaps you can do something rewarding for the user anyway
             *                  break;
             *
             *              case keyboard.USER_CANCEL:
             *                  txtArea.innerText = 'User canceled input.';
             *                  break;
             *
             *              case keyboard.USER_BACKSPACE:
             *                  var prev = txtArea.innerText;
             *                  txtArea.innerText = prev.slice(0, prev.length - 1); // Manual backspace
             *                  break;
             *
             *              case keyboard.USER_CHAR:
             *                  txtArea.innerText += txt;
             *                  break;
             *
             *              default:
             *                  console.error( "[keyCallback] Received unknown callback message: " + userSelected );
             *          }
             *      }
             *
             * Below is a validation callback example for checking input from a half-screen keyboard:
             *
             *      function onValidation( text ) {
             *          // the only valid text is "open sesame"
             *          if (text === "open sesame") {
             *              return true;
             *          }
             *          var options = {
             *              body: 'Invalid text',
             *              btn_1: 'Close',
             *              display: nwf.ui.Dialog.DISPLAY_GAMEPAD,
             *          };
             *          nwf.ui.Dialog.displayAlert(function(){}, options);
             *          return false;
             *      }
             *
             * @class nwf.input.SoftwareKeyboard
             * @singleton
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Invokes the Wii U Software Keyboard and displays it on the screen specified in the options object.
             * The results of the user input are passed in the arguments of the callback function as an Object when the user presses a key (when `fullscreen = false`) or when the user exits the keyboard (when `fullscreen = true`).
             *
             * __Notes:__
             *
             * - If invoking manually on a text field, be sure to call `event.preventDefault()` in the callback so that WebKit does not interfere.
             * - When using `#invoke` you will need to manually scroll the "cursor" on a `textField` or `div` element containing the resulting text.
             * - If the `#invoke` method is called when `SoftwareKeyboard` is already open then an error will be thrown.
             *
             * @static
             * @param {Function} callback When `fullscreen` is `true`, this function is called only when the user presses the <b>OK</b> or <b>Cancel</b> buttons to return to the screen. When `fullscreen` is `false`, this function is called _on each key press_, in addition to when <b>OK</b> or <b>Cancel</b> are pressed.
             * @param {Object} callback.output Object containg the input recieved through the software keyboard.
             * @param {String} callback.output.text String containing the text from user input.
             *
             *  __Note:__ _In fullscreen mode, returns with all input; otherwise, returns on every keypress with the one character._
             *
             * @param {String} callback.output.user_select The key that was pressed.
             *
             * __Note:__ _When in fullscreen mode this will be either `nwf.input.SoftwareKeyboard.USER_OK` or `nwf.input.SoftwareKeyboard.USER_CANCEL`.
             * Otherwise it can be `nwf.input.SoftwareKeyboard.USER_CHAR` or `nwf.input.SoftwareKeyboard.USER_BACKSPACE` as well._
             *
             * @param {Object} [options] Optional parameters to set up the software keyboard when it is invoked. Parameters set here will override the defaults listed.
             * @param {String} [options.text] The initial text to display in the keyboard when it is invoked. When using this option in half-screen keyboard mode, only set the text that will be in front of the cursor, not the entire string that is in the input field.
             * @param {Boolean} [options.fullscreen=false] When set to `true`, the keyboard opens in fullscreen. When set to `false`, the keyboard opens in half-screen. Defaults to the half-screen keyboard.
             * @param {Boolean} [options.prediction=false] When set to `true`, predictive text input is enabled. When set to `false`, it is disabled.
             * @param {Boolean} [options.pause_media=false] When set to `true`, currently-playing media will be paused while the keyboard is in use. When set to `false`, media continues to play while the keyboard is in use.
             * @param {Boolean} [options.pause_webkit=false] When set to `true`, the keyboard pauses WebKit upon opening. WebKit operations will resume when the keyboard is closed. When set to `false`, it does not. __Note:__ This option is only available when using `fullscreen` mode.
             * @param {Number} [options.mode=nwf.input.SoftwareKeyboard.MODE_FULL] The start mode of the keyboard.
             * @param {nwf.input.SoftwareKeyboardFlags} [options.flags=nwf.input.SoftwareKeyboardFlags.FLAG_ALL] If the keyboard mode is nwf.input.SoftwareKeyboard.MODE_FULL, this flag limits the layouts that can be specified. Specify multiple layouts using binary operators.
             *
             * Ex: flags =  nwf.input.SoftwareKeyboardFlags.FLAG_QWERTY_US_ENG | nwf.input.SoftwareKeyboardFlags.FLAG_QWERTY_US_SPA
             * @param {String} [options.guide_string=''] Specifies a guide string to be displayed at the top of the input form.
             * @param {Number} [options.form_type=nwf.input.SoftwareKeyboard.INPUT_FORM_TYPE_PROPORTIONAL] Sets the keyboard to use the proportional or monospace input form.
             * @param {nwf.input.SoftwareKeyboardInvalidChars} [options.invalid_chars=0] Specifies characters that cannot be used in the keyboard. Specify multiple characters using binary operators.
             *
             * Ex: invalid_chars =  nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_SLASH | nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_BACKSLASH
             * @param {Number} [options.password=nwf.input.SoftwareKeyboard.PASSWORD_DISABLE] The password mode of the keyboard.
             * @param {Number} [options.display=nwf.input.SoftwareKeyboard.DISPLAY_GAMEPAD] The screen to display the keyboard on.
             * @param {Number} [options.max_chars=-1] The maximum number of characters to allow as input. The default value, `-1`, means unlimited.
             * @param {String} [options.ok_string] The custom string to be displayed on the keyboard's OK button.
             * @param {nwf.input.SoftwareKeyboardType} [options.start_keyboard] The keyboard type that is displayed upon invocation. For instance, use this to start the keyboard in Spanish mode instead of the default English.
             * @param {Number} [options.start_tab] The keyboard tab that is displayed upon invocation. The tabs are at the bottom near the OK button and are defined as follows:
             *
             * When the tab number is -1, default tab numbers are used for each keyboard.
             *
             * For PC keyboards (Japanese): 0: Alphabetic, 1: Numeric, 2: ASCII symbols, 3: Latin characters
             *
             * For PC keyboards (Russian): 0: Alphabetic, 1: Numeric, 2: ASCII symbols, 3: Cyrillic characters
             *
             * For PC keyboards (other than Japanese or Russian): 0: Alphabetic, 1: Numeric, 2: ASCII symbols
             *
             * For Japanese kana keyboards: 0: Hiragana, 1: Katakana, 2: Uppercase alphabetic, 3: Lowercase alphabetic, 4: ASCII symbols
             *
             * For Japanese cell phone keyboards: 0: Hiragana, 1: Katakana, 2: Alphabetic, 3: Numeric
             *
             * For Japanese hand-written input keyboards: Tab numbers are invalid.
             *
             * For Japanese symbol keyboards, Latin script keyboards, and US/EU symbol keyboards: Tab number = Number of pages.
             *
             * @param {Function} [validationCallback] This function is called only when the user presses the <b>OK</b> button. If the return value of the function is true, the keyboard closes, otherwise the keyboard remains invoked. A dialog may be opened during this callback to inform the user of the result. __Note:__ The standard web dialogs (alert, prompt, and confirm) will not work in this callback; use one of the alert methods in `nwf.ui.Dialog` instead.
             * @param {String} validationCallback.text String containing the text from user input.
             *
             * @async
             * @since 1.0
             */
            invoke(callback: any, options?: any, validationCallback?: any): void;
            /**
             * Dismisses the software keyboard.
             *
             * The <i>options</i> parameter specifies whether the keyboard dismissal will be treated as the user pressing <b>OK</b> or <b>Cancel</b>.
             *
             * @static
             * @param {Number} [options=DISMISS_OK]
             * @since 1.0
             */
            dismiss(options?: number): void;
            /**
             * Clears the software keyboard's internal text buffer. This is useful if the text area was cleared by some means other than using the software keyboard (such as if the innerText property of the text area is set to the empty string).
             *
             * Ex:
             *
             *      txtArea.innerText = '';
             *      nwf.input.SoftwareKeyboard.clearBuffer();
             *
             * @static
             * @return {Boolean} Returns `false` if the software keyboard is not in use, or returns `true` otherwise.
             * @since 1.5
             */
            clearBuffer(): boolean;
            /**
             * Enables the default software keyboard that is displayed whenever the user selects a text field. This will enable the default software keyboard for the rest of the application's session lifetime.
             * @static
             * @return {Boolean} Returns `true` if the default software keyboard was previously enabled, or returns `false` otherwise.
             * @since 1.0
             */
            enableDefault(): boolean;
            /**
             * Disables the default software keyboard that is displayed whenever the user selects a text field.
             * This will also disable the restriction that calling `focus()` before interacting with the page using the Touch Screen or Wii Remote will not bring up the default software keyboard.
             *
             * *IMPORTANT: This will disable the default software keyboard for the rest of the application's session lifetime.* Do not forget to call `nwf.input.SoftwareKeyboard.enableDefault()` if you want other parts of your application (e.g., different pages) to use the default software keyboard again.
             * @static
             * @return {Boolean} Returns `true` if the default software keyboard was previously enabled, or returns `false` otherwise.
             * @since 1.0
             */
            disableDefault(): boolean;
            /**
             * Accesses an instance of the `Software Keyboard` singleton.
             *
             * @method getInstance
             * @returns {nwf.input.SoftwareKeyboard} The `SoftwareKeyboard` singleton instance.
             * @static
             * @since 1.4
             */
            static getInstance(): SoftwareKeyboard;
            /**@ignore*/
            private static s_instance;
            /**
             * Full keyboard. Includes all characters and language options.
             * @property {int} [MODE_FULL=0]
             * @static @constant
             * @since 1.0
             */
            MODE_FULL: number;
            /**
             * Keypad version of the keyboard, with numbers and backspace keys available.
             * @property {int} [MODE_NUMERIC=1]
             * @static @constant
             * @since 1.0
             */
            MODE_NUMERIC: number;
            /**
            * Keyboard used for typing in a Nintendo Network ID, which includes all alphanumeric keys plus the '-', '_', space bar, and backspace keys.
            * @property {int} [MODE_NNID=4]
            * @static @constant
            * @since 1.5
            */
            MODE_NNID: number;
            /**
            * Keyboard used for typing in a password.
            * @property {int} [MODE_PASSWORD=5]
            * @static @constant
            * @since 1.5
            */
            MODE_PASSWORD: number;
            /**
             * Default mode for the keyboard. Will not hide input.
             * @property {int} [PASSWORD_DISABLE=0]
             * @static @constant
             * @since 1.0
             */
            PASSWORD_DISABLE: number;
            /**
             * Password Mode. Hides characters immediately after input. Note that this only affects the fullscreen keyboard, since developers have complete control of input (on each keypress) in the half-screen keyboard.
             *
             * In order to hide characters in an input field when using the half-screen keyboard, use the value `password` for the type attribute of the input element:
             *
             *      <input type="password">
             *
             * @property {int} [PASSWORD_IMMEDIATE=1]
             * @static @constant
             * @since 1.0
             */
            PASSWORD_IMMEDIATE: number;
            /**
             * Password Mode. Hides input after waiting one second. Note that this only affects the fullscreen keyboard, since developers have complete control of input (on each keypress) in the half-screen keyboard.
             *
             * In order to hide characters in an input field when using the half-screen keyboard, use the value `password` for the type attribute of the input element:
             *
             *      <input type="password">
             *
             * @property {int} [PASSWORD_1SEC=2]
             * @static @constant
             * @since 1.0
             */
            PASSWORD_1SEC: number;
            /**
             * Constant for displaying the keyboard on the TV Display.
             * @property {int} [DISPLAY_TV=0]
             * @static @constant
             * @since 1.0
             */
            DISPLAY_TV: number;
            /**
             * Constant for displaying the keyboard on the GamePad Display.
             * @property {int} [DISPLAY_GAMEPAD=1]
             * @static @constant
             * @since 1.0
             */
            DISPLAY_GAMEPAD: number;
            /**
             * Constant for displaying the keyboard with a proportional input form.
             *
             *  __Note:__ This only affects the fullscreen keyboard.
             * @property {int} [INPUT_FORM_TYPE_PROPORTIONAL=1]
             * @static @constant
             * @since 1.2
             */
            INPUT_FORM_TYPE_PROPORTIONAL: number;
            /**
             * Constant for displaying the keyboard with a monospace input form.
             *
             * __Note:__ This only affects the fullscreen keyboard.
             * @property {int} [INPUT_FORM_TYPE_MONOSPACE=0]
             * @static @constant
             * @since 1.2
             */
            INPUT_FORM_TYPE_MONOSPACE: number;
            /**
             * Constant for prohibiting the use of the `@` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_ATMARK instead.
             * @property {int} [INVALID_CHAR_ATMARK=4]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_ATMARK: number;
            /**
             * Constant for prohibiting the use of the `\` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_BACKSLASH instead.
             * @property {int} [INVALID_CHAR_BACKSLASH=32]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_BACKSLASH: number;
            /**
             * Constant for prohibiting the use of the `€` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_EUROMARK instead.
             * @property {int} [INVALID_CHAR_EUROMARK=256]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_EUROMARK: number;
            /**
             * Constant for prohibiting the use of the `heart` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_HEART instead.
             * @property {int} [INVALID_CHAR_HEART=128]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_HEART: number;
            /**
             * Constant for prohibiting the use of the `linefeed` button.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_LINEFEED instead.
             * @property {int} [INVALID_CHAR_LINEFEED=1]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_LINEFEED: number;
            /**
             * Constant for prohibiting the use of the `%` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_PERCENT instead.
             * @property {int} [INVALID_CHAR_PERCENT=8]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_PERCENT: number;
            /**
             * Constant for prohibiting the use of numeric keys.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_NUMERIC instead.
             * @property {int} [INVALID_CHAR_NUMERIC=64]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_NUMERIC: number;
            /**
             * Constant for prohibiting the use of the `/` symbol.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_SLASH instead.
             * @property {int} [INVALID_CHAR_SLASH=16]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_SLASH: number;
            /**
             * Constant for prohibiting the use of the `space` key.
             * @deprecated 1.3 Use nwf.input.SoftwareKeyboardInvalidChars.INVALID_CHAR_SPACE instead.
             * @property {int} [INVALID_CHAR_SPACE=2]
             * @static @constant
             * @since 1.2
             */
            INVALID_CHAR_SPACE: number;
            /**
             * Constant returned in the callback object when the user selects OK.
             * @property {String} [USER_OK='ok']
             * @static @constant
             * @since 1.0
             */
            USER_OK: string;
            /**
             * Constant returned in the callback object when the user selects Cancel.
             * @property {String} [USER_CANCEL='cancel']
             * @static @constant
             * @since 1.0
             */
            USER_CANCEL: string;
            /**
             * Constant returned in the callback object when the user presses the backspace key (non-fullscreen keyboard only).
             * @property {String} [USER_BACKSPACE='backspace']
             * @static @constant
             * @since 1.0
             */
            USER_BACKSPACE: string;
            /**
             * Constant returned in the callback object when the user presses any printable character (non-fullscreen keyboard only).
             * @property {String} [USER_CHAR='char']
             * @static @constant
             * @since 1.0
             */
            USER_CHAR: string;
            /**
             * Constant passed into the dismiss method to tell the keyboard to act as if OK was pressed when it is dismissed.
             * @property {int} [DISMISS_OK=0]
             * @static @constant
             * @since 1.0
             */
            DISMISS_OK: number;
            /**
             * Constant passed into the dismiss method to tell the keyboard to act as if Cancel was pressed when it is dismissed.
             * @property {int} [DISMISS_CANCEL=1]
             * @static @constant
             * @since 1.0
             */
            DISMISS_CANCEL: number;
        }
    }
}
declare module nwf {
    module io {
        /**
         * `IOError` constants for File and Directory method return values and the {@link nwf.events.IOEvent#errorID errorID} property of an {@link nwf.events.IOEvent IOEvent}.
         *
         * @enum nwf.io.IOError
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var IOError: {
            ERROR_NONE: number;
            ERROR_BADF: number;
            ERROR_INVALIDPARAM: number;
            ERROR_EXISTS: number;
            ERROR_MAXFILES: number;
            ERROR_ACCESS: number;
            ERROR_NOTFOUND: number;
            ERROR_NOSPACE: number;
            ERROR_OVERFLOW: number;
            ERROR_UNSUPPORTED: number;
            ERROR_UNKNOWN: number;
            ERROR_NOLISTENER: number;
        };
    }
}
declare module nwf {
    module io {
        class Directory {
            /**
             * The `Directory` class object provides functions for interacting with directories on the Wii U file system.
             *
             *     // Get reference to application root directory
             *     var appDir = nwf.io.Directory.appRootDirectory;
             *
             *     // List all files in the directory relative to the main HTML file (e.g., index.html)
             *     console.log( appDir.listFiles() );
             *
             * Use the `{@link nwf.io.Directory#constructor new nwf.io.Directory}(directoryPath)` constructor to get an object for a specific directory.
             *
             * ### Working with the Wii U File System during debug
             *
             * When working on a CAT-DEV, the Wii U file system is emulated on the PC to make debugging easier.
             * Because of this, file read/write speeds will be slower and directory locations will be different than when the application is running on a production system.
             *
             * PC file system mappings _(Assumes $CAFE_BOOT_MODE=PCFS)_
             *
             * -   The #volAppDirectory --> `%Project Location%/app/`
             * -   The #appTempDirectory --> `%Project Location%/save/common/temp/`
             * -   The #appCommonSaveDirectory --> `%Project Location%/save/common/`
             * -   The #appAccountSaveDirectory --> `%Project Location%/save/800000xx/` _(where xx is an account slot index)_
             * -   The AOC Directory (obtainable via {@link nwf.aoc.AOCTitle#getDirectory getDirectory()} method on an AOC Title) --> `%Project Location%/aoc/1234567/` _(example of a title with a Unique ID: 0x12345 and Variation: 67)_
             *
             * __Note:__ The File I/O feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.io` to be defined.
             *
             * @class nwf.io.Directory
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor(directoryPath?: string);
            /**
             * Name of the directory
             * @property {String} [directoryName='']
             * @readonly
             * @since 1.0
             */
            directoryName: string;
            /**
             * Returns `true` if the directory is read-only, or `false` if it is not.
             * @property {Boolean} [readonly=false]
             * @readonly
             * @since 1.0
             */
            readonly: boolean;
            /**
             * Returns the directory that this directory resides in.
             * @property {nwf.io.Directory} [parentDirectory]
             * @readonly
             * @since 1.0
             */
            parentDirectory: void;
            /**
             * Full system path of this directory.
             * @property {String} [systemPath='']
             * @readonly
             * @since 1.0
             */
            systemPath: string;
            /**
             * Creates a subdirectory with the specified name. Returns a reference to the new directory. As a result, directory creation can be chained.
             * @param {String} newDirectoryName The name for the new directory.
             * @since 1.0
             * @returns {nwf.io.Directory}
             */
            create(newDirectoryName: string): string;
            /**
             * Renames the directory.
             * @param {String} newDirectoryName The new name for the directory.
             * @since 1.0
             */
            rename(newDirectoryName: string): void;
            /**
             * Removes a sub-directory or File.
             * @param {String} name The name of the directory or file to remove. For files, the name must include the extension.
             * @since 1.0
             */
            remove(name: string): void;
            /**
             * Returns a list of files in this directory.
             * @returns {nwf.io.File[]}
             * @since 1.0
             */
            listFiles(): any[];
            /**
             * Returns a list of directories in this directory.
             * @returns {nwf.io.Directory[]}
             * @since 1.0
             */
            listSubDirectories(): any[];
            /**
             * Application directory. This is the root directory of the application.
             *
             * Note: This differs from `#volAppDirectory`, as the path of this directory is relative to the main HTML file executed by Nintendo Web Framework.
             * The `#volAppDirectory` is the topmost directory on the main volume.
             * @since 1.0
             * @static
             * @readonly
             * @property {nwf.io.Directory} [appRootDirectory]
             */
            static appRootDirectory: Directory;
            /**
             * Root directory of the content volume. This is the root directory of all content accessible in Nintendo Web Framework.
             *
             * __Note:__ This maps to _`%Project Location%/content/app/`_.
             * @since 1.0
             * @static
             * @readonly
             * @property {nwf.io.Directory} [volAppDirectory]
             */
            static volAppDirectory: Directory;
            /**
             * Temporary directory. The contents of this directory are deleted between application sessions.
             *
             * __Note:__ This maps to _`%Project Location%/save/common/temp/`_.
             * @since 1.0
             * @readonly
             * @static
             * @property {nwf.io.Directory} [appTempDirectory]
             */
            static appTempDirectory: Directory;
            /**
             * Common save directory. The contents of this directory are visible from all of the console's accounts.
             *
             * __Note:__ This maps to _`%Project Location%/save/common/`_.
             * @since 1.0
             * @readonly
             * @static
             * @property {nwf.io.Directory} [appCommonSaveDirectory]
             */
            static appCommonSaveDirectory: Directory;
            /**
             * Account save directory. The contents of this directory are visible only from the account that is currently logged in.
             *
             * __Note:__ This maps to _`%Project Location%/save/account/`_.
             * @since 1.0
             * @readonly
             * @static
             * @property {nwf.io.Directory} [appAccountSaveDirectory]
             */
            static appAccountSaveDirectory: Directory;
            /**
             * Removes a directory and all of its contents.
             *
             * @method removeDirectory
             * @static
             * @param {String} directoryPath The full path to the directory to be removed.
             * @since 1.0
             */
            static removeDirectory(directoryPath: string): void;
        }
    }
}
declare module nwf {
    module events {
        class IOEvent extends Event {
            /**
             * An `IOEvent` object is triggered when an asynchronous method is called from the Nintendo Web Framework IO API.
             *
             * @see {@link nwf.io.File}
             * @class nwf.events.IOEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Data contents of the file. This will be a `Blob` when `{@link nwf.io.File#read read}` was called or an `Array` when `{@link nwf.io.File#readAsTextureBundle readAsTextureBundle}` was called. Only set when a file read is complete (when `#READ_COMPLETE` is fired). Otherwise this value is {@link null}.
             * @property {Blob | Array} [data=null]
             * @readonly
             * @since 1.0
             */
            data: any;
            /**
             * Integer value of the error that triggered the event.
             * @property {int} [errorID=IOError.ERROR_NONE]
             * @readonly
             * @since 1.0
             * @see nwf.io.IOError.ERROR_NONE
             */
            errorID: number;
            /**
             * Dispatched when a file read is successful. Triggered by [nwf.io.File.read](#!/api/nwf.io.File-method-read).
             * This event will add the `#data` property to the event object.
             * @property {string} [READ_COMPLETE='readComplete']
             * @since 1.0
             * @static @constant
             */
            static READ_COMPLETE: string;
            /**
             * Dispatched when a file save is successful. Triggered by [nwf.io.File.save](#!/api/nwf.io.File-method-save).
             * @property {string} [SAVE_COMPLETE='saveComplete']
             * @since 1.0
             * @static @constant
             */
            static SAVE_COMPLETE: string;
            /**
             * Dispatched when an error occurs during any file operations.
             * @property {string} [ERROR='error']
             * @since 1.0
             * @static @constant
             */
            static ERROR: string;
        }
    }
}
declare module nwf {
    module io {
        class File extends nwf.events.EventDispatcher {
            /**
             * The `File` class object provides functions for interacting with files on the file system.
             *
             * The `File` class dispatches the following events:
             *
             * - nwf.events.IOEvent.ERROR
             * - nwf.events.IOEvent.READ_COMPLETE
             * - nwf.events.IOEvent.SAVE_COMPLETE
             *
             * Use the `{@link nwf.io.File#constructor new nwf.io.File}(fileString, dirObj)` constructor to get an object for a specific file.
             *
             * __Note:__ The File I/O feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.io` to be defined.
             *
             * @class nwf.io.File
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Name of the file.
             * @property {String} [fileName='']
             * @readonly
             * @since 1.0
             */
            fileName: string;
            /**
             * Extension of the file.
             * @property {String} [fileExtension='']
             * @readonly
             * @since 1.0
             */
            fileExtension: string;
            /**
             * File creation date.
             * @property {Date} [dateCreated]
             * @readonly
             * @since 1.0
             */
            dateCreated: Date;
            /**
             * File modification date.
             * @property {Date} [dateModified]
             * @readonly
             * @since 1.0
             */
            dateModified: Date;
            /**
             * Returns `true` if the file is read-only, or `false` if it is not.
             * @property {Boolean} [readonly=false]
             * @readonly
             * @since 1.0
             */
            readonly: boolean;
            /**
             * Whether the file exists or not.
             * Returns `true` if the path exists and points to a file, or `false` otherwise.
             * @property {Boolean} [exists=false]
             * @readonly
             * @since 1.0
             */
            exists: boolean;
            /**
             * File size in bytes.
             * @property {uint32} [size=0]
             * @readonly
             * @since 1.0
             */
            size: number;
            /**
             * The directory that this file resides in.
             * @property {nwf.io.Directory} [parentDirectory]
             * @readonly
             * @since 1.0
             */
            parentDirectory: {};
            /**
             * Full system path of this file.
             * @property {String} [systemPath='']
             * @readonly
             * @since 1.0
             */
            systemPath: string;
            /**
             * Rename the file
             * @param {String} newFileName The new name for the file including the file extension.
             * @returns {Number} An error code defined by `nwf.io.IOError enum`.
             * @since 1.0
             */
            rename(newFileName: string): number;
            /**
             * Removes the File from the filesystem.
             * @returns {Number} An error code defined by `nwf.io.IOError enum`.
             * @since 1.0
             */
            remove(): number;
            /**
             * Initializes a `Read` of the contents of the file.
             * The contents of the file will be returned as a `Blob` in a `{@link nwf.events.IOEvent#READ_COMPLETE READ_COMPLETE}` event.
             * If a listener for the `{@link nwf.events.IOEvent#READ_COMPLETE READ_COMPLETE}` event has not been added to the target before calling this method, `{@link nwf.io.IOError#ERROR_NOLISTENER ERROR_NOLISTENER}` will be returned.
             *
             * **Note** It is not recommended to read more than ten files at once. Doing so may cause the application to run out of memory.
             *
             * @param {Object} [options] Object specifiying what options (if any) to use when reading the file.
             * @param {String} [options.type] String that specifies the `MIME` type of the data. This will be used to determine which memory heap the data should use. This value will be passed to the `type` property of the `Blob` returned with the `{@link nwf.events.IOEvent#READ_COMPLETE READ_COMPLETE}` event.
             * @param {String} [options.encoding] A string specifing the type of encoding to use when decompressing a compressed file. Currently the only supported encoding is '`gzip`'.
             * @returns {Number} An error code defined by nwf.io.IOError enum.
             * @since 1.1
             */
            read(options?: any): number;
            /**
            * Initializes a `Read` of the contents of the file and assumes it is an array of textures. This can save memory use by decoding the data straight into an array rather than using an intermediate `Blob` like the `#read` method.
            * The contents of the file will be returned as an `Array` in a `{@link nwf.events.IOEvent#READ_COMPLETE READ_COMPLETE}` event.
            * If a listener for the `{@link nwf.events.IOEvent#READ_COMPLETE READ_COMPLETE}` event has not been added to the target before calling this method, `{@link nwf.io.IOError#ERROR_NOLISTENER ERROR_NOLISTENER}` will be returned.
            * @param {Object} [options] Object specifiying what options (if any) to use when reading the file.
            * @param {String} [options.encoding] A string specifing the type of encoding to use when decompressing a compressed file. Currently the only supported encoding is '`gzip`'.
            * @returns {Number} An error code defined by nwf.io.IOError enum.
            * @since 1.8.2
            */
            readAsTextureBundle(options?: any): number;
            /**
             * Saves the contents of the specified {@link Blob} data to the file.
             * @param {Blob} data The data to save to the file.
             * @returns {Number} An error code defined by `nwf.io.IOError enum`.
             * @since 1.1
             */
            save(data: any): number;
            /** @removed 1.1 Removed from API. Use nwf.io.File.read instead.*/
            readAsUint8Array(): number;
            /** @removed 1.1 Removed from API. Use nwf.io.File.save instead.*/
            saveAsUint8Array(data: any): number;
            /**
             * Removes a File from the file-system.
             *
             * @method removeFile
             * @param {String} filePath The full path to the file to be removed.
             * @returns {Number} An error code defined by `nwf.io.IOError enum`.
             * @since 1.0
             * @static
             */
            static removeFile(filePath: string): number;
        }
    }
}
declare module nwf {
    module events {
        class CameraEvent extends Event {
            /**
             * Defines events dispatched by the `Camera` class.
             *
             * @class nwf.events.CameraEvent
             * @see {@link nwf.media.Camera}
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the camera is initialized and ready to stream video to the surface.
             * @property {String} [READY='ready']
             * @static @constant
             * @since 1.0
             */
            static READY: string;
            /**
             * Dispatched when the camera stream is open and streaming video to the surface.
             * @property {String} [OPEN='open']
             * @static @constant
             * @since 1.0
             */
            static OPEN: string;
            /**
             * Dispatched when the camera stream is closed and the surface is no longer updated.
             * @property {String} [CLOSE='close']
             * @static @constant
             * @since 1.0
             */
            static CLOSE: string;
            /**
             * Dispatched when the camera is exited and de-initialized.
             * @property {String} [EXIT='exit']
             * @static @constant
             * @since 1.0
             */
            static EXIT: string;
        }
    }
}
declare module nwf {
    module media {
        class Camera extends nwf.events.EventDispatcher {
            /**
             * Class for working with a camera image stream. Currently the only supported camera is the camera available on the Wii U GamePad.
             *
             * __Note:__ The Camera feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.media.Camera` to be defined.
             *
             *      // Get the canvas context to draw to.
             *      var ctx = document.getElementById('canvas').getContext('2d');
             *
             *      // Set up the GamePad's Camera.
             *      gpCamera = nwf.media.Camera.getCamera(0);
             *      var camCapabilities = gpCamera.capabilities;
             *      var frameRates = camCapabilities.frameRates;
             *      var camDimensions = camCapabilities.resolutions[0];
             *
             *      // Set camera ready event handler.
             *      gpCamera.addEventListener(nwf.events.CameraEvent.READY, function(evt) {
             *          gpCamera.open();
             *      }, this);
             *
             *      // Set camera open event handler.
             *      gpCamera.addEventListener(nwf.events.CameraEvent.OPEN, function(evt) {
             *          webkitRequestAnimationFrame(draw); // Start the animation loop.
             *      }, this);
             *
             *      // Now that the event listeners are defined initialize the camera
             *      gpCamera.initialize(frameRates[frameRates.length - 1]);
             *
             *      function draw() {
             *          // drawImageStream is a Nintendo Web Framework only method that allows us to draw the stream easily.
             *          ctx.drawImageStream(gpCamera.imageStream, 0, 0, camDimensions.width, camDimensions.height);
             *          webkitRequestAnimationFrame(draw);
             *      }
             * See `#imageStream` and [drawImageStream](#!/api/CanvasRenderingContext2D-method-drawImageStream) for details.
             *
             * The `Camera` class dispatches the following events:
             *
             * - nwf.events.CameraEvent.CLOSE
             * - nwf.events.CameraEvent.EXIT
             * - nwf.events.CameraEvent.OPEN
             * - nwf.events.CameraEvent.READY
             *
             * @class nwf.media.Camera
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a `Camera` object; use `#getCamera` instead.
             * @since 1.0
             * @method constructor
             */
            constructor();
            /**
             * The reference ID of the camera.
             * @property {int} [id=0]
             * @readonly
             * @since 1.0
             */
            id: number;
            /**
             * The name of the current camera, as returned by the camera hardware.
             * @property {String} [name='CAMERA_0']
             * @readonly
             * @since 1.0
             */
            name: string;
            /**
             * The current frame rate of the camera ( 15 | 30 ), set when initializing the camera.
             * @property {int} [currentFPS=15]
             * @readonly
             * @since 1.0
             */
            currentFPS: number;
            /**
             * The capabilities object of the camera.
             *
             * Capabilities Object:
             *
             *     Capabilities = {
             *      frameRates:[15, 30],        // Array of supported capture frame rates.
             *      resolutions:[               // A list of supported resolutions as {width, height} objects.
             *          {width:640, height:480} // The width and height of the camera resolution in pixels.
             *      ]
             *     };
             * @property {Object} [capabilities={ frameRates:[15,30], resolutions:[{width:640, height:480}] }]
             * @readonly
             * @since 1.0
             */
            capabilities: {
                frameRates: number[];
                resolutions: {
                    width: number;
                    height: number;
                }[];
            };
            /**
             * Pointer (ID) to the live image stream. Use [drawImageStream](#!/api/CanvasRenderingContext2D-method-drawImageStream) to render to the canvas element.
             * @property {uint32} [imageStream=null]
             * @readonly
             * @since 1.0
             */
            imageStream: void;
            /**
             * Returns `true` if the camera is initialized and ready to begin streaming captured video; returns `false` otherwise.
             * @property {Boolean} [isReady=false]
             * @readonly
             * @since 1.0
             */
            isReady: boolean;
            /**
             * Initializes the camera and prepares it for video capture.
             * @param {int} [frameRate=15] The capture frame rate.
             * @since 1.0
             */
            initialize(frameRate?: number): void;
            /**
             * Starts the video stream and begins writing to the <code>ImageData</code> buffer.
             * @since 1.0
             */
            open(): void;
            /**
             * Resumes updating the <code>ImageData</code> buffer.
             * @since 1.0
             */
            play(): void;
            /**
             * Stops updating the <code>ImageData</code> buffer, pausing the image.
             * @since 1.0
             */
            pause(): void;
            /**
             * Stops the video stream. The <code>ImageData</code> buffer will no longer be updated.
             * @since 1.0
             */
            close(): void;
            /**
             * Calling this function de-initializes the video decode hardware and frees the `Camera` instance.
             * @since 1.0
             */
            exit(): any;
            /**
             * Converts `Camera` instance to `{@link String}`.
             * @since 1.0
             * @returns {String}
             */
            toString(): string;
            /**
             * Returns value of `Camera` instance as a `{@link String}`.
             * @since 1.0
             * @returns {String}
             */
            valueOf(): string;
            /**
             * Returns a reference to a <code>Camera</code> object for capturing video. Returns the <code>Camera</code> singleton instance of camera 0 by default.
             *
             * Use <code>#getAvailableCameras()</code> to get a list of supported cameras.
             * @method getCamera
             * @param {Number} [id=0] Only supported value.
             * @returns {nwf.media.Camera} The <code>Camera</code> singleton instance of a specific camera.
             * @since 1.0
             * @static
             */
            static getCamera(id: number): Camera;
            /**
             * Method to test for class availability.
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported(): boolean;
            /**
             * Returns an Array of available `Camera` objects.
             * @method getAvailableCameras
             * @returns {Array} List of available cameras.
             * @since 1.0
             * @static
             */
            static getAvailableCameras(): Camera[];
            /** @ignore */
            static s_camera: typeof Camera;
        }
    }
}
declare module nwf {
    module events {
        class MicrophoneEvent extends Event {
            /**
             * Defines events dispatched by the `Microphone` class.
             *
             * @see {@link nwf.media.Microphone}
             * @class nwf.events.MicrophoneEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the microphone is initialized and ready to `{@link nwf.media.Microphone#open open()}` the audio buffer.
             * @property {String} [READY='ready']
             * @static @constant
             * @since 1.2
             */
            static READY: string;
            /**
             * Dispatched when the microphone is open and streaming audio to the audio buffer.
             * @property {String} [OPEN='open']
             * @static @constant
             * @since 1.2
             */
            static OPEN: string;
            /**
             * Dispatched when the microphone is closed and the audio buffer is no longer updated.
             * @property {String} [CLOSE='close']
             * @static @constant
             * @since 1.2
             */
            static CLOSE: string;
            /**
             * Dispatched when the microphone is exited and de-initialized.
             * @property {String} [EXIT='exit']
             * @static @constant
             * @since 1.2
             */
            static EXIT: string;
            /**
             * Dispatched when a microphone is connected to the Wii U.
             *
             * @property {String} [CONNECTED='connected']
             * @since 1.2
             * @static @constant
             */
            static CONNECTED: string;
            /**
             * Dispatched when a microphone is disconnected from the Wii U.
             *
             * @property {String} [DISCONNECTED='disconnected']
             * @since 1.2
             * @static @constant
             */
            static DISCONNECTED: string;
        }
    }
}
declare module nwf {
    module media {
        /**
         * `MicrophoneType` constants.
         *
         * @enum nwf.media.MicrophoneType
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var MicrophoneType: {
            GAMEPAD: string;
            USB: string;
        };
    }
}
declare module nwf {
    module media {
        /**
         * `MicrophoneError` constants for `Microphone` method return values and the `errorID` property of a `MicrophoneEvent`.
         *
         * @enum nwf.media.MicrophoneError
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        var MicrophoneError: {
            NONE: number;
            NOT_SUP: number;
            INV_ARG: number;
            INV_STATE: number;
            NO_MEM: number;
            ALREADY_OPEN: number;
            NOT_OPEN: number;
            NOT_INIT: number;
            NOT_CONNECTED: number;
            INIT_BUFF_SIZE: number;
        };
    }
}
declare module nwf {
    module media {
        class Microphone extends nwf.events.EventDispatcher {
            /**
             * Class for working with the audio input from a Microphone.
             *
             * __Note:__ The Microphone feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.media.Microphone` to be defined.
             *
             * The `Microphone` class dispatches the following events:
             *
             * - nwf.events.MicrophoneEvent.CLOSE
             * - nwf.events.MicrophoneEvent.EXIT
             * - nwf.events.MicrophoneEvent.OPEN
             * - nwf.events.MicrophoneEvent.READY
             * - nwf.events.MicrophoneEvent.CONNECTED
             * - nwf.events.MicrophoneEvent.DISCONNECTED
             *
             * @class nwf.media.Microphone
             * @extends nwf.events.EventDispatcher
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a `Microphone` object; use `#getMicrophone` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * The reference ID of the microphone.
             * @property {int} [id=0]
             * @readonly
             * @since 1.2
             */
            id: number;
            /**
             * The type of microphone object.
             * @see {@link nwf.media.MicrophoneType}
             * @property {String} [type=nwf.media.MicrophoneType.GAMEPAD]
             * @readonly
             * @since 1.2
             */
            type: string;
            /**
             * The name of the current microphone, as returned by the microphone hardware.
             * @property {String} [name='']
             * @readonly
             * @since 1.2
             */
            name: string;
            /**
             * Returns `true` once the microphone is initialized and ready to begin streaming captured audio; returns `false` otherwise.
             * @property {Boolean} [isReady=false]
             * @readonly
             * @since 1.2
             */
            isReady: boolean;
            /**
             * The current Gain value of the Microphone hardware in dB.
             * @readonly
             * @property {Number} [gain=10]
             * @since 1.2
             */
            gain: number;
            /**
             * Minimum Gain value supported by the Microphone hardware in dB.
             * @readonly
             * @property {Number} [minGain=0]
             * @since 1.2
             */
            minGain: number;
            /**
             * Maximum Gain value supported by the Microphone hardware in dB.
             * @readonly
             * @property {Number} [maxGain=25]
             * @since 1.2
             */
            maxGain: number;
            /**
             * Returns `true` if the Microphone's echo cancellation is on, or `false` if it is off.
             *
             * __Note:__ Currently only supported on the GamePad Microphone. A Microphone that does not support this feature will always return `false`.
             * @readonly
             * @property {Boolean} [echoCancellation=false]
             * @since 1.2
             */
            echoCancellation: boolean;
            /**
             * Initializes the microphone and prepares it for audio capture.
             * @since 1.2
             */
            initialize(): void;
            /**
             * Starts the audio stream and begins writing to the internal ring buffer.
             *
             * _CAUTION: Microphone must be initialized before calling this function._
             *
             * @returns {int} Error status code.
             * @see {@link nwf.media.MicrophoneError}
             * @since 1.2
             */
            open(): number;
            /**
             * Creates a Web Audio source node to be used in audio routing with the Web Audio API.
             *
             * __CAUTION:__ _Microphone must be opened before calling this function._
             *
             * @param {AudioContext} audioContext The AudioContext (Web Audio API) to associate the source node with.
             * @returns {AudioSourceNode} Web Audio source node.
             * @see [AudioContext](http://www.w3.org/TR/webaudio/#AudioContext-section)
             * @see [AudioSourceNode](http://www.w3.org/TR/webaudio/#AudioSourceNode-section)
             * @since 1.2
             */
            createAudioSource(audioContext: any): void;
            /**
             * Stops the audio stream. The internal ring buffer will no longer be updated.
             *
             * __CAUTION:__ _Microphone must be initialized before calling this function._
             * @returns {int} Error status code.
             * @see {@link nwf.media.MicrophoneError}
             * @since 1.2
             */
            close(): number;
            /**
             * Calling this function will de-initialize the microphone hardware and free the memory used by the internal drivers.
             * @returns {int} Error status code.
             * @see {@link nwf.media.MicrophoneError}
             * @since 1.2
             */
            exit(): number;
            /**
             * Sets the programmable options of the Microphone.
             *
             * _This function operates in a separate thread and the applied options may take a few milliseconds to be applied. Reading the value of `#gain` or `#echoCancellation` immediately after calling this function will not necessarily reflect the supplied gain value._
             *
             * __CAUTION:__ _Microphone must be opened before calling this function._
             *
             * @param {Object} options Object containing values to set the configurable options of the Microphone hardware.
             * @param {Number} [options.gain] Microphone gain value in units of dB.
             * @param {Boolean} [options.echoCancellation=false] When set to `true`, echo cancellation on the microphone is enabled. When set to `false`, it is disabled.
             * @returns {int} Error status code.
             * @see {@link nwf.media.MicrophoneError}
             * @since 1.2
             */
            registerState(options: any): number;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.2
             * @static
             */
            static isSupported(): boolean;
            /**
             * Returns an Array of available `Microphone` objects.
             *
             * @method getAvailableMicrophones
             * @returns {nwf.media.Microphone[]} List of all available microphones.
             * @since 1.2
             * @static
             */
            static getAvailableMicrophones(): any;
            /**
             * Returns a `Microphone` instance based on either a Microphone's ID or the type of `Microphone` object requested.
             * @method getMicrophone
             * @see {@link nwf.media.MicrophoneType}
             * @see {@link nwf.media.Microphone#id nwf.media.Microphone.id}
             * @param  {Number|String} [id_or_type=0] the ID or type of a `Microphone` object to return. __Note:__ if more than one Microphone of the type is available only the first in the list is returned.
             * @returns {nwf.media.Microphone}
             * @static
             */
            static getMicrophone(id_or_type: any): any;
            /** @ignore */
            private static s_microphone;
        }
    }
}
declare module nwf {
    module events {
        class MiiverseEvent extends Event {
            /**
             * Events dispatched by the `Miiverse` class.
             *
             * @see {@link nwf.mv.Miiverse}
             * @class nwf.events.MiiverseEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * The list of `{@link nwf.mv.MiiverseDownloadedComment comments}` returned from the server after a successful query.
             * Only set when `nwf.events.MiiverseEvent.DOWNLOAD_COMMENT_SUCCESS` is dispatched.
             * @property {Array} [comments=[]]
             * @readonly
             * @since 1.4
             */
            comments: any[];
            /**
             * The list of `{@link nwf.mv.MiiverseDownloadedPost posts}` returned from the server after a successful query.
             * Only set when `nwf.events.MiiverseEvent.DOWNLOAD_POST_SUCCESS` is dispatched.
             * @property {Array} [posts=[]]
             * @readonly
             * @since 1.0
             */
            posts: any[];
            /**
             * The `{@link nwf.mv.MiiverseDownloadedPost#id postID}` of the uploaded post.
             * Only set when `nwf.events.MiiverseEvent.UPLOAD_POST_SUCCESS` is dispatched.
             * @property {String} [postID='']
             * @readonly
             * @since 1.6
             */
            postID: string;
            /**
             * The list of `{@link nwf.mv.MiiverseDownloadedCommunity communities }` returned from the server after a successful query.
             * Only set when `nwf.events.MiiverseEvent.DOWNLOAD_COMMUNITY_SUCCESS` is dispatched.
             * @property {Array} [communities=[]]
             * @readonly
             * @since 1.2
             */
            communities: any[];
            /**
             * Error code that is set on a fail event. Helps tie the failed event to a nwf.events.SystemErrorEvent.
             * @property {uint32} [errorCode=null]
             * @readonly
             * @since 1.3
             * @see nwf.system.SystemErrorCode
             */
            errorCode: any;
            /**
             * The `{@link nwf.mv.MiiverseUploadedPost MiiverseUploadedPost}` or `{@link nwf.mv.MiiverseUploadedComment MiiverseUploadedComment}` object of the post that was sent to the server.
             * Only set when `nwf.events.MiiverseEvent.UPLOAD_POST_SUCCESS` or `nwf.events.MiiverseEvent.UPLOAD_COMMENT_SUCCESS` is dispatched.
             * @property {nwf.mv.MiiverseUploadedPost|nwf.mv.MiiverseUploadedComment} [uploadResult=null]
             * @readonly
             * @since 1.7
             */
            uploadResult: any;
            /**
            * An array of `nwf.mv.MiiverseDownloadedUserData` objects matching the result of the user data search.
            * Only set when `nwf.events.MiiverseEvent.DOWNLOAD_USER_DATA_LIST_SUCCESS` is dispatched.
            * @property {nwf.mv.MiiverseDownloadedUserData[]} [users=null]
            * @readonly
            * @since 1.8.1
            */
            users: any;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getPostList getPostList} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [DOWNLOAD_POST_SUCCESS='miiverseDownloadPostSuccess']
             * @static @constant
             * @since 1.0
             */
            static DOWNLOAD_POST_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getPostList getPostList} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [DOWNLOAD_POST_FAILED='miiverseDownloadPostFailed']
             * @static @constant
             * @since 1.0
             */
            static DOWNLOAD_POST_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getCommunityList getCommunityList} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [DOWNLOAD_COMMUNITY_SUCCESS='miiverseDownloadCommunitySuccess']
             * @static @constant
             * @since 1.2
             */
            static DOWNLOAD_COMMUNITY_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getCommunityList getCommunityList} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [DOWNLOAD_COMMUNITY_FAILED='miiverseDownloadCommunityFailed']
             * @static @constant
             * @since 1.2
             */
            static DOWNLOAD_COMMUNITY_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#initialize initialize} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [INITIALIZATION_SUCCESS='miiverseInitializationSuccess']
             * @static @constant
             * @since 1.0
             */
            static INITIALIZATION_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#initialize initialize} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [INITIALIZATION_FAILED='miiverseInitializationFailed']
             * @static @constant
             * @since 1.0
             */
            static INITIALIZATION_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#sendPost sendPost} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [UPLOAD_POST_SUCCESS='miiverseUploadPostSuccess']
             * @static @constant
             * @since 1.0
             */
            static UPLOAD_POST_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#sendPost sendPost} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [UPLOAD_POST_FAILED='miiverseUploadPostFailed']
             * @static @constant
             * @since 1.0
             */
            static UPLOAD_POST_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#sendComment sendComment} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [UPLOAD_COMMENT_SUCCESS='miiverseUploadCommentSuccess']
             * @static @constant
             * @since 1.4
             */
            static UPLOAD_COMMENT_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#sendComment sendComment} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [UPLOAD_COMMENT_FAILED='miiverseUploadCommentFailed']
             * @static @constant
             * @since 1.4
             */
            static UPLOAD_COMMENT_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getCommentList getCommentList} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [DOWNLOAD_COMMENT_SUCCESS='miiverseDownloadPostSuccess']
             * @static @constant
             * @since 1.4
             */
            static DOWNLOAD_COMMENT_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#getCommentList getCommentList} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [DOWNLOAD_COMMENT_FAILED='miiverseDownloadCommentFailed']
             * @static @constant
             * @since 1.4
             */
            static DOWNLOAD_COMMENT_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#deletePost deletePost} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [DELETE_POST_SUCCESS='miiverseDeletePostSuccess']
             * @static @constant
             * @since 1.4.5
             */
            static DELETE_POST_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#deletePost deletePost} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [DELETE_POST_FAILED='miiverseDeletePostFailed']
             * @static @constant
             * @since 1.4.5
             */
            static DELETE_POST_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#addEmpathy addEmpathy} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [ADD_EMPATHY_SUCCESS='miiverseAddEmpathySuccess']
             * @static @constant
             * @since 1.7
             */
            static ADD_EMPATHY_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#addEmpathy addEmpathy} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [ADD_EMPATHY_FAILED='miiverseAddEmpathyFailed']
             * @static @constant
             * @since 1.7
             */
            static ADD_EMPATHY_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#removeEmpathy removeEmpathy} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [REMOVE_EMPATHY_SUCCESS='miiverseRemoveEmpathySuccess']
             * @static @constant
             * @since 1.7
             */
            static REMOVE_EMPATHY_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#removeEmpathy removeEmpathy} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [REMOVE_EMPATHY_FAILED='miiverseRemoveEmpathyFailed']
             * @static @constant
             * @since 1.7
             */
            static REMOVE_EMPATHY_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#followUser followUser} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [FOLLOW_USER_SUCCESS='miiverseFollowUserSuccess']
             * @static @constant
             * @since 1.7
             */
            static FOLLOW_USER_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#followUser followUser} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [FOLLOW_USER_FAILED='miiverseFollowUserFailed']
             * @static @constant
             * @since 1.7
             */
            static FOLLOW_USER_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#unfollowUser unfollowUser} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * @property {String} [UNFOLLOW_USER_SUCCESS='miiverseUnfollowUserSuccess']
             * @static @constant
             * @since 1.7
             */
            static UNFOLLOW_USER_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#unfollowUser unfollowUser} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [UNFOLLOW_USER_FAILED='miiverseUnfollowUserFailed']
             * @static @constant
             * @since 1.7
             */
            static UNFOLLOW_USER_FAILED: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#downloadUserData downloadUserData} of the {@link nwf.mv.Miiverse Miiverse} class is successful.
             * The `event` object returned with this event will contain a `#users` property with the results.
             * @property {String} [DOWNLOAD_USER_DATA_LIST_SUCCESS='miiverseDownloadUserDataListSuccess']
             * @static @constant
             * @since 1.8.1
             */
            static DOWNLOAD_USER_DATA_LIST_SUCCESS: string;
            /**
             * Dispatched when a call made to {@link nwf.mv.Miiverse#downloadUserData downloadUserData} of the {@link nwf.mv.Miiverse Miiverse} class fails.
             * @property {String} [DOWNLOAD_USER_DATA_LIST_FAILED='miiverseDownloadUserDataListFailed']
             * @static @constant
             * @since 1.8.1
             */
            static DOWNLOAD_USER_DATA_LIST_FAILED: string;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseSearchParam {
            /**
             * Class contains the structure of a Miiverse search query.
             *
             * @class nwf.mv.MiiverseSearchParam
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new `MiiverseSearchParam` object.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Community ID.
             *
             * __Note:__ _If this is left as default, then the default community for the application is searched._
             * @property {uint32} [communityID=0]
             * @since 1.0
             */
            communityID: number;
            /**
             * Filters what kind of posts the search will return.
             * Combine different filters using binary operators. Ex: `search.filter = FILTER_FROM_FRIEND | FILTER_BODY_MEMO`
             *
             * This property can be manipulated directly, or it can be set by changing the `#empathyAdded`, `#from`, `#getMiiData`, `#hasSpoiler`, and `#distinctPID` properties. Example:
             *
             *     var searchParam = new nwf.mv.MiiverseSearchParam();
             *     // This adds the value of the `nwf.mv.MiiverseSearchParam.FILTER_WITH_EMPATHY` flag to `searchParam.filter`
             *     searchParam.empathyAdded = true;
             *     // This adds the value of the `nwf.mv.MiiverseSearchParam.FILTER_FROM_FRIEND` flag to `searchParam.filter`
             *     searchParam.from = nwf.mv.MiiverseSearchParam.FROM_FRIEND;
             *     // The following line is true. This value could also be set by using the flags from `nwf.mv.MiiverseSearchParam`.
             *     searchParam.filter === nwf.mv.MiiverseSearchParam.FILTER_WITH_EMPATHY | nwf.mv.MiiverseSearchParam.FILTER_FROM_FRIEND;
             *
             * __Note:__ _Not all of the flags that can be set on the `filter` property have an associated property._
             * @property {uint32} [filter=nwf.mv.MiiverseSearchParam.FILTER_NONE]
             * @since 1.0
             */
            filter: number;
            /**
            * Filters whose posts the search will return.
            * Setting this property to one of the `nwf.mv.MiiverseSearchParam.FROM_` constants changes the value of the `#filter` property by adding the value of the flag corresponding to the set value; setting it to `false` subtracts the flag's value.
            * @property {String} [from=nwf.mv.MiiverseSearchParam.FROM_DEFAULT]
            * @since 1.0
            */
            from: string;
            /**
            * Filters what kind of posts the search will return.
            * @property {nwf.mv.MiiversePostType} [postType=nwf.mv.MiiversePostType.TEXT]
            * @since 1.0
            */
            postType: string;
            /**
            * Determines whether the returned posts have Mii data. When set to `false`, no Mii data is attached. When set to `true`, Mii data is attached.
            * @property {Boolean} [hasMiiData=false]
            * @since 1.0
            * @deprecated 1.5 Use nwf.mv.MiiverseSearchParam.getMiiData instead.
            */
            hasMiiData: boolean;
            /**
            * Determines whether the the returned posts have Mii data. When set to `false`, no Mii data is attached. When set to `true`, Mii data is attached.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseSearchParam.FILTER_WITH_MII_DATA` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [getMiiData=false]
            * @since 1.5
            */
            getMiiData: boolean;
            /**
            * When set to `true`, only posts that are marked as spoilers are returned. When set to `false`, this is not the case.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseSearchParam.FILTER_WITH_SPOILER` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [hasSpoiler=false]
            * @since 1.0
            */
            hasSpoiler: boolean;
            /**
            * When set to `true`, the returned posts' `{@link nwf.mv.MiiverseDownloadedPost#empathyAdded empathyAdded}` property will indicate if the posts have had empathy added by the Active `{@link nwf.act.NintendoAccount Account}`. When set to `false`, the posts' `{@link nwf.mv.MiiverseDownloadedPost#empathyAdded empathyAdded}` property will always return `false` regardless of whether empathy has been added or not.
            *
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseSearchParam.FILTER_WITH_EMPATHY` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [empathyAdded=false]
            * @since 1.0
            */
            empathyAdded: boolean;
            /**
            * When set to `true`, a single post is returned from each poster. When set to `false`, multiple posts are returned from each poster.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseSearchParam.FILTER_DISTINCT_PID` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [distinctPID=false]
            * @since 1.0
            */
            distinctPID: boolean;
            /**
             * The language of the posts to be retrieved.
             *
             * This can be set to `nwf.system.WiiULanguageCode.ALL` to retrieve posts from all languages or `nwf.system.WiiULanguageCode.SYSTEM` to retrieve posts in the language that the Wii U console is set to.
             *
             * __Note:__ After setting it to `nwf.system.WiiULanguageCode.SYSTEM` this property will return the value of the current console language and not `nwf.system.WiiULanguageCode.SYSTEM`.
             *
             * @property {uint8} [languageID=nwf.system.WiiULanguageCode.SYSTEM]
             * @see nwf.system.WiiULanguageCode
             * @since 1.0
             */
            languageID: number;
            /**
            * The personal ID of a specific user to search for.
            * Incompatable with `#FILTER_FROM_FRIEND` and `#FILTER_FROM_FOLLOW`.
            * @property {uint8} [pID=0]
            * @since 1.0
            */
            pID: number;
            /**
             * Maximum number of items to get.
             * `nwf.mv.MiiverseSearchParam.MAXIMUM_POST_COUNT` value can be changed by `{@link nwf.mv.Miiverse#initialize nwf.mv.Miiverse.getInstance().initialize()}`.
             * A `MiiverseSearchParam` created before `initialize` has completed successfully may have a default property greater than `{@link nwf.mv.Miiverse#getPostList nwf.mv.Miiverse.getInstance().getPostList()}` will accept.
             * @since 1.0
             * @property {uint32} [=nwf.mv.MiiverseSearchParam.MAXIMUM_POST_COUNT]
             */
            maxNum: number;
            /**
             * Only posts with the specified string set in their `{@link nwf.mv.MiiverseUploadPost#searchKey searchKey}` property is returned by the search.
             * @property {String} [searchKey='']
             * @since 1.0
             */
            searchKey: string;
            /**
             * Only search for posts that have the specified `{@link nwf.mv.MiiverseDownloadedPost#id ids}`.
             * @see nwf.mv.MiiverseDownloadedPost.id
             * @property {Array} [postIDs=[]]
             * @since 1.7
             */
            postIDs: any;
            /**
             * Sets whether the fetched posts will have their `{@link nwf.mv.MiiverseDownloadedPost#appData appData}` as a `Blob` or  a `string`. When set to `true`, the `{@link nwf.mv.MiiverseDownloadedPost#appData appData}` will be a `string`. When set to `false`, it will be a `Blob`.
             *
             * __Note:__ This should be set to correspond to the type of `{@link nwf.mv.MiiverseUploadPost#appData appData}` the `{@link nwf.mv.MiiverseUploadPost posts}` were uploaded with. The `{@link nwf.mv.MiiverseUploadPost#appData appData}` may not be correct in returned search results otherwise.
             *
             * @property {Boolean} [appDataAsString=false]
             * @since 1.8.2
             * @removed 1.9.0 This was removed in favor of a generic utility. Please see `nwf.utils.stringToBlob` and `nwf.utils.blobToString`.
             */
            appDataAsString: boolean;
            /**
             * Default (get without distinction).
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_NONE=0]
             */
            FILTER_NONE: number;
            static FILTER_NONE: number;
            /**
             * Get from friends.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_FRIEND=1]
             */
            FILTER_FROM_FRIEND: number;
            /**
             * Get from favorites.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_FOLLOW=2]
             */
            FILTER_FROM_FOLLOW: number;
            /**
             * Get posts made by the current user.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_SELF=4]
             */
            static FILTER_FROM_SELF(): number;
            /**
             * Get posts with text.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_BODY_TEXT=8]
             */
            FILTER_BODY_TEXT: number;
            /**
             * Get posts with a drawn memo.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_BODY_MEMO=16]
             */
            FILTER_BODY_MEMO: number;
            /**
            * Get posts from a specific user.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_DISTINCT_PID=32]
            */
            FILTER_DISTINCT_PID: number;
            /**
            * Get posts with Mii data attached.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_WITH_MII_DATA=64]
            */
            FILTER_WITH_MII_DATA: number;
            /**
            * Get posts that have empathy. (Yeah!)
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_WITH_EMPATHY=128]
            */
            FILTER_WITH_EMPATHY: number;
            /**
            * Get posts that are marked as spoilers.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_WITH_SPOILER=256]
            */
            FILTER_WITH_SPOILER: number;
            /**
            * Get posts from everyone.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_DEFAULT='fromDefault']
            */
            FROM_DEFAULT: string;
            static FROM_DEFAULT: string;
            /**
            * Get posts from the users that are followed by the current user.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_FAVORITE='fromFavorite']
            */
            FROM_FAVORITE: string;
            /**
            * Get posts from the current user's friends.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_FRIEND='fromFriend']
            */
            FROM_FRIEND: string;
            /**
            * Get posts from the current user.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_SELF='fromSelf']
            */
            FROM_SELF: string;
            /**
            * The maximum number of posts that can be requested from one call of `{@link nwf.mv.Miiverse#getPostList getPostList}`.
            * This value can be changed by `{@link nwf.mv.Miiverse#initialize nwf.mv.Miiverse.getInstance().initialize()}`.
            * @since 1.0
            * @static @readonly
            * @property {Number} [MAXIMUM_POST_COUNT=30]
            */
            MAXIMUM_POST_COUNT: number;
            static MAXIMUM_POST_COUNT: number;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseUploadComment {
            /**
             * Class contains the structure of an uploadable Miiverse post comment.
             *
             * @class nwf.mv.MiiverseUploadComment
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new MiiverseUploadComment object.
             * @method constructor
             * @since 1.4
             */
            constructor();
            /**
            * Type of post that will be uploaded.
            * This only affects posts made through the post application.
            * Combine different types using binary operators.
            *
            * Ex: `post.type = nwf.mv.MiiverseUploadPostType.FLAG_SPOILER | nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY`
            * @since 1.4
            * @property {nwf.mv.MiiverseUploadPostType} [type=nwf.mv.MiiverseUploadPostType.FLAG_NONE]
            */
            type: number;
            /**
            * If set to `true`, the post can only be a memo. If set to `false`, the post can be either a memo or text.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_MEMO_ONLY` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [memoOnly=false]
            * @since 1.4
            */
            memoOnly: boolean;
            /**
            * If set to `true`, the post can only be text. If set to `false`, the post can be either a memo or text.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [textOnly=false]
            * @since 1.4
            */
            textOnly: boolean;
            /**
            * If set to `true`, the post could contain a spoiler. If set to `false`, it cannot.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_SPOILER` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [isSpoiler=false]
            * @since 1.4
            */
            isSpoiler: boolean;
            /**
            * Specifies the post to respond to by `{@link nwf.mv.MiiverseDownloadedPost#id ID}`.
            * @property {String} [postID='']
            * @since 1.4
            */
            postID: string;
            /**
            * The body text of the post.
            * This string cannot be greater than 200 characters in length.
            * @property {String} [body='']
            * @since 1.4
            */
            body: string;
            /**
            * The maximum length of body text of the post. This value cannot exceed 255.
            * @property {Number} [bodyMaxSize=255]
            * @since 1.4
            */
            bodyMaxSize: number;
            /**
            * Post memo (image) of size 320×120.
            * @since 1.4
            * @property {HTMLImageElement} [memo=undefined]
            */
            memo: void;
            /**
            * A JPEG of size 800x450.
            * If `Image.complete` is not `true` or the image is not of the correct dimensions, this thows an error.
            * @since 1.4
            * @property {HTMLImageElement} [screenshot=undefined]
            */
            screenshot: void;
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that will be saved with the post.
            * @property {null | Blob} [appData=null]
            * @since 1.4
            */
            appData: any;
            /**
             * Can be set to an array of stamp images, as `HTMLImageElement` objects. The dimensions of the images must be either 100x100 or 200x200. These images will become available in the post application as stamps that can be added to the `#memo`.
             * Be sure that the Miiverse has successfully initialized before setting this property.
             *
             * __Note:__ _The images must be fully loaded before they are set to this property or an error will be thrown._
             *
             * @since 1.8.1
             * @see nwf.mv.MiiverseUploadPost.stamps
             * @see nwf.mv.Miiverse.initialize
             * @see nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS
             * @property {Array} [stamps=null]
             */
            stamps: void;
            /**
             * Expression of the Mii character on the post; also called the `feelingID`.  This is the face set on the Mii that will be shown with the post in the Miiverse application.
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.8.1
             */
            miiExpression: number;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseUploadPost {
            /**
             * Class contains the structure of an uploadable Miiverse post.
             *
             * @class nwf.mv.MiiverseUploadPost
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new MiiverseUploadPost object.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
            * Type of post that will be uploaded.
            * This only affects posts made through the post application.
            * Combine different types using binary operators.
            * Ex: `post.type = nwf.mv.MiiverseUploadPostType.FLAG_SPOILER | nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY`
            *
            * This property can be manipulated directly, or it can be set by changing the `#isSpoiler`, `#memoOnly`, and `#textOnly` properties. Example:
            *
            *     var mvUploadPost = new nwf.mv.MiiverseUploadPost();
            *     // This adds the value of the `nwf.mv.MiiverseUploadPostType.FLAG_SPOILER` flag to `mvUploadPost.type`
            *     mvUploadPost.isSpoiler = true;
            *     // This adds the value of the `nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY` flag to `mvUploadPost.type`
            *     mvUploadPost.textOnly = true;
            *     // The following line is true. This value could also be set by using the flags in `nwf.mv.MiiverseUploadPostType`.
            *     mvUploadPost.type === nwf.mv.MiiverseUploadPostType.FLAG_SPOILER | nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY;
            *
            * @type nwf.mv.MiiverseUploadPostType
            * @since 1.0
            * @property {nwf.mv.MiiverseUploadPostType} [=nwf.mv.MiiverseUploadPostType.FLAG_NONE]
            */
            type: number;
            /**
            * If set to `true`, the post can only be a memo. If set to `false`, the post can be either a memo or text.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_MEMO_ONLY` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [memoOnly=false]
            * @since 1.0
            */
            memoOnly: boolean;
            /**
            * If set to `true`, the post can only be text. If set to `false`, the post can be either a memo or text.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_TEXT_ONLY` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [textOnly=false]
            * @since 1.0
            */
            textOnly: boolean;
            /**
            * If set to `true`, the post could contain a spoiler. If set to `false`, it cannot.
            * Setting this property to `true` changes the value of the `#type` property by adding the value of the `nwf.mv.MiiverseUploadPostType.FLAG_SPOILER` flag; setting it to `false` subtracts the flag's value.
            * This only affects posts made through the post application.
            * @property {Boolean} [isSpoiler=false]
            * @since 1.0
            */
            isSpoiler: boolean;
            /**
             * Specifies an external URL to attach to the post.
             * @property {String} [dataURL='']
             * @since 1.0
             */
            dataURL: string;
            /**
            * Specifies the community to post to.
            * @property {uint32} [communityID=0]
            * @since 1.0
            */
            communityID: number;
            /**
            * The body text of the post.
            * This string cannot be greater than 200 characters in length.
            * @property {String} [body='']
            * @since 1.0
            */
            body: string;
            /**
            * The maximum length of body text of the post. This value cannot exceed 255.
            * @property {Number} [bodyMaxSize=255]
            * @since 1.0
            */
            bodyMaxSize: number;
            /**
            * Post memo (image) of size 320×120.
            * @since 1.0
            * @property {HTMLImageElement} [memo=undefined]
            */
            memo: void;
            /**
            * A JPEG of size 800x450.
            * If `Image.complete` is not `true` or the image is not of the correct dimensions, this will throw an error.
            * @since 1.0
            * @property {HTMLImageElement} [screenshot=undefined]
            */
            screenshot: void;
            /**
             * A string that tags the post with a specified topic.
             * @property {String} [tag='']
             * @since 1.0
             */
            tag: string;
            /**
            * An array of strings that can index the post for searches. A maximum of 5 keys are allowed.
            * @see {@link nwf.mv.MiiverseSearchParam#searchKey}
            * @property {Array} [searchKey=['']]
            * @since 1.0
            */
            searchKey: string[];
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that will be saved with the post.
            * @property {null | Blob} [appData=null]
            * @since 1.0
            */
            appData: any;
            /**
             * A string of up to 1024 characters that will be saved with the post.
             * @property {String} [appDataString='']
             * @deprecated 1.4 Use nwf.mv.MiiverseUploadPost.appData instead.
             * @since 1.0
             */
            appDataString: string;
            /**
            * Can be set to an array of stamp images, as `HTMLImageElement` objects. The dimensions of the images must be either 100x100 or 200x200. These images will become available in the post application as stamps that can be added to the `#memo`.
            * Be sure that the Miiverse has successfully initialized before setting this property.
            *
            * __Note:__ _The images must be fully loaded before they are set to this property or an error will be thrown._
            *
            *       // get instance of the miiverse and an upload post
            *       var miiverse = nwf.mv.Miiverse.getInstance();
            *       var uploadPost = new nwf.mv.MiiverseUploadPost();
            *
            *       // create an array to store the stamps in once they are loaded
            *       var stampArray = [];
            *
            *       // Miiverse stamps are HTMLImageElements
            *       var stamp1 = new Image();
            *       var stamp2 = new Image();
            *
            *       // add listeners for the Miiverse class
            *       miiverse.addEventListener(nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS, onInit);
            *       miiverse.addEventListener(nwf.events.MiiverseEvent.UPLOAD_POST_SUCCESS, onPostUpload);
            *
            *       // function to call when the Miiverse intilization is complete
            *       function onInit(evt){
            *               // listen for the stamp images to load and then set them to the stampArray
            *               stamp1.addEventListener('load', function(evt){
            *                   stampArray.push(stamp1);
            *                   stamp2.src = 'assets/stamp2.png';
            *               });
            *               stamp2.addEventListener('load', function(evt){
            *                   stampArray.push(stamp2);
            *                   // once all the stamps are loaded, set them to the post
            *                   uploadPost.stamps = stampArray;
            *                   // send the post to the Miiverse using the post application
            *                   miiverse.sendPost(uploadPost, true);
            *               });
            *               // begin loading the stamp images
            *               stamp1.src = 'assets/stamp1.png';
            *       }
            *
            *       // function to call when the post is uploaded
            *       function onPostUpload(evt){
            *           console.log(evt);
            *       }
            *
            *       // initilize Miiverse to start the event chain
            *       miiverse.initialize();
            *
            * @since 1.7
            * @see nwf.mv.Miiverse.initialize
            * @see nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS
            * @property {Array} [stamps=null]
            */
            stamps: void;
            /**
             * Expression of the Mii character on the post; also called the `feelingID`.  This is the face set on the Mii that will be shown with the post in the Miiverse application.
             *
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.8.1
             */
            miiExpression: number;
            /**
            * Determines whether this post can be used to launch the application from Miiverse. If `true`, then this post will be able to launch the application. If `false`, it will not.
            *
            * If this post is used to launch the application, the `{@link nwf.mv.Miiverse#appParams appParams}` property of `nwf.mv.Miiverse` will return a valid object.
            *
            * @property {Boolean} [isAppStartable=false]
            * @since 1.8.2
            */
            isAppStartable: boolean;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseUserDataSearchParam {
            /**
             * `MiiverseUserDataSearchParams` are used to define the results returned when calling `{@link nwf.mv.Miiverse#downloadUserData downloadUserData}`.
             * In order for the download to be successful, one of the ID properties (`#communityID`, `#postID`, or `#principalID`) below must be set.
             *
             * @class nwf.mv.MiiverseUserDataSearchParam
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * Creates a new `MiiverseUserDataSearchParam` object.
             * @method constructor
             * @since 1.8.1
             */
            constructor();
            /**
             * The ID of a Community that the users have favorited.
             * This property is incompatible with `#principalID` and `#postID`; whichever is set __last__ will be used in the search.
             *
             * @property {Number} [communityID = 0]
             * @since 1.8.1
             */
            communityID: number;
            /**
            * Determines whether the returned users have Mii data.
            * When set to `false`, no Mii data is attached. When set to `true`, Mii data is attached.
            * @property {Boolean} [hasMiiData = false]
            * @since 1.8.1
            */
            hasMiiData: boolean;
            /**
            * When set to `true`, users that are friends with the user specified by the `#principalID` property will be searched for.
            * If a `#principalID` is not specified, this property will remain `false`.
            * This property is incompatible with `#followerSearch`; setting this property to `true` will automatically set `#followerSearch` to `false`.
            *
            * @property {Boolean} [friendSearch = false]
            * @since 1.8.1
            */
            friendSearch: boolean;
            /**
            * When set to `true`, users that are followers of the user specified by the `#principalID` property will be searched for.
            * If a `#principalID` is not specified, this property will remain `false`.
            * This property is incompatible with `#friendSearch`; setting this property to `true` will automatically set `#friendSearch` to `false`.
            *
            * @property {Boolean} [followerSearch = false]
            * @since 1.8.1
            */
            followerSearch: boolean;
            /**
            * The `principalID` of a specific user to search for.
            * If searching by `principalID` then either `#friendSearch` or `#followerSearch` must be set to `true` or the search will fail.
            * This property is incompatible with `#communityID` and `#postID`; whichever is set __last__ will be used in the search.
            *
            * @property {Number} [principalID = 0]
            * @since 1.8.1
            */
            principalID: number;
            /**
             * Maximum number of users to get.
             * This will default to the value of `nwf.mv.MiiverseSearchParam.MAXIMUM_POST_COUNT`.
             * A `MiiverseUserDataSearchParam` created before `{@link nwf.mv.Miiverse#initialize initialize}` has completed successfully may have this property set to a greater value than `{@link nwf.mv.Miiverse#downloadUserData nwf.mv.Miiverse.downloadUserData()}` will accept.
             *
             * @since 1.8.1
             * @property {Number} [maxNum = nwf.mv.MiiverseSearchParam.MAXIMUM_POST_COUNT]
             */
            maxNum: number;
            /**
             * Find users who have favorited the provided `{@link nwf.mv.MiiverseDownloadedPost#id postID}`.
             * This property is incompatible with `#principalID` and `#communityID`; whichever is set __last__ will be used in the search.
             *
             * @property {String} [postID = '']
             * @see nwf.mv.MiiverseDownloadedPost.id
             * @since 1.8.1
             */
            postID: string;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseCommunitySearchParam {
            /**
             * Class contains the structure of a Miiverse community search query.
             *
             * @class nwf.mv.MiiverseCommunitySearchParam
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new `MiiverseCommunitySearchParam` object.
             * @method constructor
             * @since 1.2
             */
            constructor();
            /**
             * Community ID.
             * @property {uint32} [communityID=0]
             * @since 1.2
             */
            communityID: number;
            /**
              * Filters what kind of communities the search will return.
              * @property {uint32} [filter=nwf.mv.MiiverseCommunitySearchParam.FLAG_FILTER_BY_OFFICIAL]
              * @since 1.2
              */
            filter: number;
            /**
             * Maximum number of items to get.
             * `nwf.mv.MiiverseCommunitySearchParam.MAXIMUM_POST_COUNT` value can be changed by `nwf.mv.Miiverse.initialize()`.
             * A `MiiverseCommunitySearchParam` created before `initialize` has completed successfully may have a default property greater than `nwf.mv.Miiverse.getCommunityList()` will accept.
             * @since 1.4
             * @property {uint32} [maxNum=nwf.mv.MiiverseCommunitySearchParam.MAXIMUM_POST_COUNT]
             */
            maxNum: number;
            /**
             * Get from favorite users.
             * @since 1.2
             * @static @constant
             * @property {Number} [FLAG_FILTER_BY_FAVORITE=1]
             */
            FLAG_FILTER_BY_FAVORITE: number;
            /**
             * Get official communities created by application developers.
             * @since 1.2
             * @static @constant
             * @property {Number} [FLAG_FILTER_BY_OFFICIAL=2]
             */
            FLAG_FILTER_BY_OFFICIAL: number;
            static FLAG_FILTER_BY_OFFICIAL: number;
            /**
             * Get communities made by the current user.
             * @since 1.2
             * @static @constant
             * @property {Number} [FLAG_FILTER_BY_SELF=4]
             */
            FLAG_FILTER_BY_SELF: number;
            /**
            * The maximum number of posts that can be requested from one call of `{@link nwf.mv.Miiverse#getCommunityList getCommunityList}`.
            *
            * Equal to 1/2 of `nwf.mv.MiiverseSearchParam.MAXIMUM_POST_COUNT` because `{@link nwf.mv.MiiverseDownloadedCommunity MiiverseDownloadedCommunity}` instances require more memory.
            * @since 1.2
            * @static @readonly
            * @property {Number} [MAXIMUM_COMMUNITY_COUNT=15]
            */
            MAXIMUM_COMMUNITY_COUNT: number;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseCommentSearchParam {
            /**
             * Class contains the structure of a Miiverse comment search query.
             *
             * @class nwf.mv.MiiverseCommentSearchParam
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new `MiiverseCommentSearchParam` object.
             * @method constructor
             * @since 1.4
             */
            constructor();
            /**
             * Filters what kind of comments the search will return.
             * Combine different filters using binary operators. Ex: `search.filter = FILTER_FROM_FRIEND | FILTER_BODY_MEMO`
             * This property can be manipulated directly, or it can be set by changing the `#from`, `#getMiiData`, `#hasSpoiler`, and `#distinctPID` properties. Example:
             *
             *     var searchParam = new nwf.mv.MiiverseCommentSearchParam();
             *     // This adds the value of the `nwf.mv.MiiverseCommentSearchParam.FILTER_WITH_EMPATHY` flag to `searchParam.filter`
             *     searchParam.empathyAdded = true;
             *     // This adds the value of the `nwf.mv.MiiverseCommentSearchParam.FILTER_FROM_FRIEND` flag to `searchParam.filter`
             *     searchParam.from = nwf.mv.MiiverseCommentSearchParam.FROM_FRIEND;
             *     // The following line is true. This value could also be set by using the flags from `nwf.mv.MiiverseCommentSearchParam`.
             *     searchParam.filter === nwf.mv.MiiverseCommentSearchParam.FILTER_WITH_EMPATHY | nwf.mv.MiiverseCommentSearchParam.FILTER_FROM_FRIEND;
             *
             * __Note:__ _Not all of the flags that can be set on the `filter` property have an associated property._
             * @property {uint32} [filter=nwf.mv.MiiverseCommentSearchParam.FILTER_NONE]
             * @since 1.4
             */
            filter: number;
            /**
            * Filters whose comments the search will return.
            * Setting this property to one of the `nwf.mv.MiiverseCommentSearchParam.FROM_` constants changes the value of the `#filter` property by adding the value of the flag corresponding to the set value; setting it to `false` subtracts the flag's value.
            * @property {String} [from=nwf.mv.MiiverseCommentSearchParam.FROM_DEFAULT]
            * @since 1.4
            */
            from: string;
            /**
            * Filters what kind of comments the search will return.
            * @property {nwf.mv.MiiversePostType} [postType=nwf.mv.MiiversePostType.TEXT]
            * @since 1.4
            */
            postType: string;
            /**
            * Determines whether the the returned comments have Mii data. When set to `false`, no Mii data is attached. When set to `true`, Mii data is attached.
            * @property {Boolean} [hasMiiData=false]
            * @since 1.4
            * @deprecated 1.5 Use nwf.mv.MiiverseCommentSearchParam.getMiiData instead.
            */
            hasMiiData: boolean;
            /**
            * Determines whether the the returned comments have Mii data. When set to `false`, no Mii data is attached. When set to `true`, Mii data is attached.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseCommentSearchParam.FILTER_WITH_MII_DATA` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [getMiiData=false]
            * @since 1.5
            */
            getMiiData: boolean;
            /**
            * When set to `true`, only comments that are marked as spoilers are returned. When set to `false`, this is not the case.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseCommentSearchParam.FILTER_WITH_SPOILER` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [hasSpoiler=false]
            * @since 1.4
            */
            hasSpoiler: boolean;
            /**
            * When set to `true`, a single comment is returned from each poster. When set to `false`, multiple comments are returned from each poster.
            * Setting this property to `true` changes the value of the `#filter` property by adding the value of the `nwf.mv.MiiverseCommentSearchParam.FILTER_DISTINCT_PID` flag; setting it to `false` subtracts the flag's value.
            * @property {Boolean} [distinctPID=false]
            * @since 1.4
            */
            distinctPID: boolean;
            /**
            * The post `{@link nwf.mv.MiiverseDownloadedPost#id ID}` to retrieve comments for.
            * @property {String} [postID='']
            * @since 1.4
            */
            postID: string;
            /**
             * Maximum number of items to get.
             * `nwf.mv.MiiverseCommentSearchParam.MAXIMUM_POST_COUNT` value can be changed by `nwf.mv.Miiverse.initialize()`.
             * A `MiiverseCommentSearchParam` created before `initialize` has completed successfully may have a default property greater than `nwf.mv.Miiverse.getCommentList()` will accept.
             * @since 1.4
             * @property {uint32} [=nwf.mv.MiiverseCommentSearchParam.MAXIMUM_POST_COUNT]
             */
            maxNum: number;
            /**
             * The language of the comments to be retrieved.
             *
             * This can be set to `nwf.system.WiiULanguageCode.ALL` to retrieve comments from all languages or `nwf.system.WiiULanguageCode.SYSTEM` to retrieve comments in the language that the Wii U console is set to.
             *
             * __Note:__ After setting it to `nwf.system.WiiULanguageCode.SYSTEM` this property will return the value of the current console language and not `nwf.system.WiiULanguageCode.SYSTEM`.
             *
             * @property {uint8} [languageID=nwf.system.WiiULanguageCode.SYSTEM]
             * @see nwf.system.WiiULanguageCode
             * @since 1.7
             */
            languageID: number;
            /**
             * Sets whether the fetched comments will have their `{@link nwf.mv.MiiverseDownloadedComment#appData appData}` as a `Blob` or  a `string`. When set to `true`, the `{@link nwf.mv.MiiverseDownloadedComment#appData appData}` will be a `string`. When set to `false`, it will be a `Blob`.
             *
             * __Note:__ This should be set to correspond to the type of `{@link nwf.mv.MiiverseUploadComment#appData appData}` the `{@link nwf.mv.MiiverseUploadComment comments}` were uploaded with. The `{@link nwf.mv.MiiverseUploadComment#appData appData}` may not be correct in returned search results otherwise.
             *
             * @property {Boolean} [appDataAsString=false]
             * @since 1.8.2
             * @removed 1.9.0 This was removed in favor of a generic utility. Please see `nwf.utils.stringToBlob` and `nwf.utils.blobToString`.
             */
            appDataAsString: boolean;
            /**
             * Default (get without distinction).
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_NONE=0]
             */
            static FILTER_NONE: number;
            FILTER_NONE: number;
            /**
             * Get from friends.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_FRIEND=1]
             */
            FILTER_FROM_FRIEND: number;
            /**
             * Get from favorites.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_FOLLOW=2]
             */
            FILTER_FROM_FOLLOW: number;
            /**
             * Get posts made by the current user.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_FROM_SELF=4]
             */
            static FILTER_FROM_SELF(): number;
            /**
             * Get posts with text.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_BODY_TEXT=8]
             */
            FILTER_BODY_TEXT: number;
            /**
             * Get posts with a drawn memo.
             * @since 1.0
             * @static @constant
             * @property {Number} [FILTER_BODY_MEMO=16]
             */
            FILTER_BODY_MEMO: number;
            /**
            * Get posts from a specific user.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_DISTINCT_PID=32]
            */
            FILTER_DISTINCT_PID: number;
            /**
            * Get posts with Mii data attached.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_WITH_MII_DATA=64]
            */
            FILTER_WITH_MII_DATA: number;
            /**
            * Get posts that are marked as spoilers.
            * @since 1.0
            * @static @constant
            * @property {Number} [FILTER_WITH_SPOILER=256]
            */
            FILTER_WITH_SPOILER: number;
            /**
            * Get posts from everyone.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_DEFAULT='fromDefault']
            */
            static FROM_DEFAULT: string;
            FROM_DEFAULT: string;
            /**
            * Get posts from the users that are followed by the current user.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_FAVORITE='fromFavorite']
            */
            FROM_FAVORITE: string;
            /**
            * Get posts from the current user's friends.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_FRIEND='fromFriend']
            */
            FROM_FRIEND: string;
            /**
            * Get posts from the current user.
            * @since 1.0
            * @static @constant
            * @property {String} [FROM_SELF='fromSelf']
            */
            FROM_SELF: string;
            /**
            * The maximum number of posts that can be requested from one call of `{@link nwf.mv.Miiverse#getPostList getPostList}`.
            * This value can be changed by `{@link nwf.mv.Miiverse#initialize nwf.mv.Miiverse.getInstance().initialize()}`.
            * @since 1.0
            * @static @readonly
            * @property {Number} [MAXIMUM_POST_COUNT=30]
            */
            static MAXIMUM_POST_COUNT: number;
            MAXIMUM_POST_COUNT: number;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseUploadedPost {
            /**
             * Class containing the structure of an uploaded Miiverse post.
             * This is returned as the `{@link nwf.events.MiiverseEvent#uploadResult uploadResult}` property of an event object when the `{@link nwf.mv.Miiverse#sendPost sendPost}` method succeeds.
             *
             * @class nwf.mv.MiiverseUploadedPost
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
            * If set to `true`, the post has `#body` text attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasBodyText=false]
            * @readonly
            * @since 1.7
            */
            hasBodyText: boolean;
            /**
            * If set to `true`, the post has `#appData` attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasAppData=false]
            * @readonly
            * @since 1.7
            */
            hasAppData: boolean;
            /**
            * If set to `true`, the post has a `#memo` attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasMemo=false]
            * @readonly
            * @since 1.7
            */
            hasMemo: boolean;
            /**
             * If set to `true`, the post could contain a spoiler.
             * If set to `false`, it does not.
             * @property {Boolean} [isSpoiler=false]
             * @readonly
             * @since 1.9.0
             */
            isSpoiler: boolean;
            /**
             * Post ID.
             * @property {String} [id='']
             * @since 1.7
             * @readonly
             */
            id: string;
            /**
             * Body of post.
             * @property {String} [body='']
             * @since 1.7
             * @readonly
             */
            body: string;
            /**
             * Post memo (image).
             * @property {HTMLImageElement} [memo=new Image]
             * @since 1.7
             * @readonly
             */
            memo: HTMLImageElement;
            /**
             * A `{@link Blob Blob}` of up to 1024 bytes that is saved with the post. This returns `null` if no `appData` exists for this post.
             * @property {null | Blob} [appData=null]
             * @since 1.7
             */
            appData: any;
            /**
             * Type of post.
             * The value returned by this property corresponds to a bit flag.
             *
             * @property {Number} [type=nwf.mv.MiiverseUploadedPostType.FLAG_NONE]
             * @see nwf.mv.MiiverseUploadedPostType
             * @readonly
             * @since 1.7
             */
            type: number;
            /**
             * Expression of the Mii character on the post; also called the `feelingID`.
             * This is the face set on the Mii that will be shown with the post in the Miiverse application.
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.7
             * @readonly
             */
            miiExpression: number;
            /**
             * The user's Mii Name.
             * @property {String} [miiName='']
             * @since 1.8.2
             * @readonly
             */
            miiName: string;
            /**
             * Draws the attached memo directly into a provided canvas.
             * The canvas must have dimensions of 320x120 or an error will be thrown.
             * @param {HTMLCanvasElement} targetCanvas The canvas that the memo will be drawn in to.
             * @since 1.7
             * @see nwf.mv.MiiverseUploadedPost.memo
             */
            renderMemo(targetCanvas: any): void;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseUploadedComment {
            /**
             * Class containing the structure of an uploaded Miiverse comment.
             * This is returned as the `{@link nwf.events.MiiverseEvent#uploadResult uploadResult}` property of an event object when the `{@link nwf.mv.Miiverse#sendComment sendComment}` method succeeds.
             *
             * @class nwf.mv.MiiverseUploadedComment
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * If set to `true`, the comment has a `#memo` attached.
             * If set to `false`, it does not.
             * @property {Boolean} [hasMemo=false]
             * @readonly
             * @since 1.7
             */
            hasMemo: boolean;
            /**
            * If set to `true`, the comment has `#body` text attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasBodyText=false]
            * @readonly
            * @since 1.7
            */
            hasBodyText: boolean;
            /**
            * If set to `true`, the comment has `#appData` attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasAppData=false]
            * @readonly
            * @since 1.7
            */
            hasAppData: boolean;
            /**
             * If set to `true`, the post could contain a spoiler.
             * If set to `false`, it does not.
             * @property {Boolean} [isSpoiler=false]
             * @readonly
             * @since 1.7
             */
            isSpoiler: boolean;
            /**
             * Post ID.
             * @property {String} [id='']
             * @since 1.7
             * @readonly
             */
            id: string;
            /**
             * Body of comment.
             * @property {String} [body='']
             * @since 1.7
             * @readonly
             */
            body: string;
            /**
             * Post memo (image).
             * @property {HTMLImageElement} [memo=new Image]
             * @since 1.7
             * @readonly
             */
            memo: HTMLImageElement;
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that is saved with the comment. This returns `null` if no `appData` exists for this comment.
            * @property {null | Blob} [appData=null]
            * @since 1.7
            */
            appData: void;
            /**
             * Type of comment.
             * The value returned by this property corresponds to a bit flag.
             *
             * @property {Number} [type=nwf.mv.MiiverseUploadedPostType.FLAG_NONE]
             * @see nwf.mv.MiiverseUploadedPostType
             * @readonly
             * @since 1.7
             */
            type: number;
            /**
             * Expression of the Mii character on the comment; also called the `feelingID`.
             * This is the face set on the Mii that will be shown with the comment in the Miiverse application.
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.7
             * @readonly
             */
            miiExpression: number;
            /**
             * The user's Mii Name.
             * @property {String} [miiName='']
             * @since 1.8.2
             * @readonly
             */
            miiName: string;
            /**
             *
             * Draws the attached memo directly into a provided canvas.
             * The canvas must have dimensions of 320x120 or an error will be thrown.
             * @param {HTMLCanvasElement} targetCanvas The canvas that the memo will be drawn in to.
             * @since 1.7
             * @see nwf.mv.MiiverseUploadedComment.memo
             */
            renderMemo(targetCanvas: any): void;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseDownloadedComment {
            /**
             * Class contains the structure of a downloaded Miiverse comment.
             *
             * @class nwf.mv.MiiverseDownloadedComment
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Type of post.
             * @property {nwf.mv.MiiverseDownloadedPostType} [type=nwf.mv.MiiverseDownloadedPostType.FLAG_NONE]
             * @readonly
             * @since 1.4
             */
            type: number;
            /**
             * Date the post was created.
             * @property {Date} [dateCreated=new Date()]
             * @readonly
             * @since 1.4
             */
            dateCreated: Date;
            /**
             * If set to `true`, the post has a `#memo` attached.
             * If set to `false`, it does not.
             * @property {Boolean} [hasMemo=false]
             * @readonly
             * @since 1.4
             */
            hasMemo: boolean;
            /**
            * If set to `true`, the post has `#body` text attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasBodyText=false]
            * @readonly
            * @since 1.4
            */
            hasBodyText: boolean;
            /**
            * If set to `true`, the post has Mii data attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasMiiData=false]
            * @readonly
            * @since 1.4
            */
            hasMiiData: boolean;
            /**
            * If set to `true`, the post has a `#screenshot` image attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasScreenshot=false]
            * @readonly
            * @since 1.4
            */
            hasScreenshot: boolean;
            /**
            * If set to `true`, the post has an external `#dataURL` link attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasExternalURL=false]
            * @readonly
            * @since 1.4
            */
            hasExternalURL: boolean;
            /**
            * If set to `true`, the post has `#appData` attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasAppData=false]
            * @readonly
            * @since 1.4
            */
            hasAppData: boolean;
            /**
             * If set to `true`, the post could contain a spoiler.
             * If set to `false`, it does not.
             * @property {Boolean} [isSpoiler=false]
             * @readonly
             * @since 1.4
             */
            isSpoiler: boolean;
            /**
             * The external URL that is attached to the post.
             * @property {String} [dataURL='']
             * @readonly
             * @since 1.4
             */
            dataURL: string;
            /**
             * Post ID.
             * @property {String} [id='']
             * @since 1.4
             * @readonly
             */
            id: string;
            /**
             * The `{@link nwf.act.NintendoAccount#principalID principalID}` of the user that added the comment.
             * @property {Number} [posterID=0]
             * @since 1.4
             * @readonly
             */
            posterID: number;
            /**
             * Country Code of the post.
             * @readonly
             * @property {Number} [countryID=0]
             * @since 1.4
             * @see nwf.system.WiiUCountryCode
             */
            countryID: number;
            /**
             * Language Code of the post.
             * @readonly
             * @property {Number} [languageID=0]
             * @since 1.4
             * @see nwf.system.WiiULanguageCode
             */
            languageID: number;
            /**
             * Region Code of the post.
             * @readonly
             * @property {Number} [regionID=0]
             * @since 1.4
             * @see nwf.system.WiiURegionCode
             */
            regionID: number;
            /**
             * Body of post.
             * @property {String} [body='']
             * @since 1.4
             * @readonly
             */
            body: string;
            /**
             * Post memo (image).
             * @property {HTMLImageElement} [memo=new Image]
             * @since 1.4
             * @readonly
             */
            memo: HTMLImageElement;
            /**
             * Screenshot from game.
             * `#downloadExternalImageData` must be called before this will return a valid value.
             * @property {HTMLImageElement} [screenshot=new Image]
             * @since 1.4
             * @readonly
             */
            screenshot: HTMLImageElement;
            /**
             * The tag attched to the post.
             * @property {String} [tag='']
             * @since 1.4
             * @readonly
             */
            tag: string;
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that is saved with the comment. This returns `null` if no `appData` exists for this comment.
            * @property {null | Blob} [appData=null]
            * @since 1.4
            */
            appData: any;
            /**
             * If set to `true`, the comment was created by the current user.
             * If set to `false`, it was not.
             *
             * @property {Boolean} [isMyPost=false]
             * @since 1.8.2
             * @readonly
             */
            isMyPost: boolean;
            /**
             * Expression of the Mii character on the post; also called the `feelingID`.
             * This is the face set on the Mii that will be shown with the post in the Miiverse application.
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.1
             * @readonly
             */
            miiExpression: number;
            /**
             * Mii Screen Name (nickName).
             * @property {String} [miiName='']
             * @since 1.4
             * @readonly
             */
            miiName: string;
            /**
            *
            * Downloads the external image.
            * @param {Function} callback The callback that will be called when the download is complete.
            * @param {Object} callback.event An `Event` object with an additional status property.
            * @param {Number} callback.event.status The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
            * @since 1.4
            * @async
            * @returns {Boolean} Returns `true` if the download started correctly, or `false` if it did not.
            */
            downloadExternalImageData(callback: any): boolean;
            /**
             *
             * Draws the attached memo directly into a provided canvas.
             * The canvas must have dimensions of 320x120 or it will throw an error.
             * @param {HTMLCanvasElement} targetCanvas The canvas that the memo will be drawn in to.
             * @since 1.4.5
             * @see nwf.mv.MiiverseDownloadedComment.memo
             */
            renderMemo(targetCanvas: any): void;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseDownloadedCommunity {
            /**
             * Class contains the structure of a downloaded Miiverse community.
             *
             * @class nwf.mv.MiiverseDownloadedCommunity
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
            * If set to `true`, the community has a title attached. If set to `false`, it does not.
            * @property {Boolean} [hasTitle=false]
            * @readonly
            * @since 1.2
            */
            hasTitle: boolean;
            /**
            * If set to `true`, the community has a description attached. If set to `false`, it does not.
            * @property {Boolean} [hasDescription=false]
            * @readonly
            * @since 1.2
            */
            hasDescription: boolean;
            /**
            * If set to `true`, the community has an icon attached. If set to `false`, it does not.
            * @property {Boolean} [hasIcon=false]
            * @readonly
            * @since 1.2
            */
            hasIcon: boolean;
            /**
            * If set to `true`, the community has `#appData` attached. If set to `false`, it does not.
            * @property {Boolean} [hasAppData=false]
            * @readonly
            * @since 1.2
            */
            hasAppData: boolean;
            /**
             * The poster ID of the creating user.
             * @property {uint64} [ownerPid=0]
             * @since 1.2
             * @readonly
             */
            ownerPid: number;
            /**
             * Community ID.
             * @property {uint32} [communityID=0]
             * @since 1.2
             * @readonly
             */
            communityID: number;
            /**
             * A unique code for the community.
             * @readonly
             * @property {String} [communityCode='']
             * @since 1.2
             */
            communityCode: string;
            /**
             * Description of the community.
             * @property {String} [description='']
             * @since 1.2
             * @readonly
             */
            description: string;
            /**
             * The icon representing the community.
             * @property {HTMLImageElement} [icon= new Image]
             * @since 1.2
             * @readonly
             */
            icon: HTMLImageElement;
            /**
             * The title attached to the community.
             * @property {String} [title='']
             * @since 1.2
             * @readonly
             */
            title: string;
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that are saved with the community. This returns `null` if no `appData` exists for this community.
            * @property {Blob} [appData={}]
            * @since 1.5
            */
            appData: {};
            /**
            * A string of up to 1024 characters that are saved with the community. This returns `null` if no `appDataString` exists.
            * @property {String} [appDataString='']
            * @since 1.2
            * @readonly
            * @deprecated 1.5 Use `#appData` instead.
            */
            appDataString: string;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseDownloadedPost {
            /**
             * Class contains the structure of a downloaded Miiverse post.
             *
             * @class nwf.mv.MiiverseDownloadedPost
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Type of post.
             * @property {nwf.mv.MiiverseDownloadedPostType} [type=nwf.mv.MiiverseDownloadedPostType.FLAG_NONE]
             * @readonly
             * @since 1.0
             */
            type: number;
            /**
             * Date the post was created.
             * @property {Date} [dateCreated=new Date()]
             * @readonly
             * @since 1.0
             */
            dateCreated: Date;
            /**
             * If set to `true`, the post has a `#memo` attached.
             * If set to `false`, it does not.
             * @property {Boolean} [hasMemo=false]
             * @readonly
             * @since 1.0
             */
            hasMemo: boolean;
            /**
            * If set to `true`, the post has `#body` text attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasBodyText=false]
            * @readonly
            * @since 1.0
            */
            hasBodyText: boolean;
            /**
            * If set to `true`, the post has Mii data attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasMiiData=false]
            * @readonly
            * @since 1.0
            */
            hasMiiData: boolean;
            /**
            * If set to `true`, the post has a `#screenshot` image attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasScreenshot=false]
            * @readonly
            * @since 1.0
            */
            hasScreenshot: boolean;
            /**
            * If set to `true`, the post has an external `#dataURL` link attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasExternalURL=false]
            * @readonly
            * @since 1.0
            */
            hasExternalURL: boolean;
            /**
            * If set to `true`, the post has `#appData` attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasAppData=false]
            * @readonly
            * @since 1.0
            */
            hasAppData: boolean;
            /**
            * If set to `true`, the post has an `AppData` string attached.
            * If set to `false`, it does not.
            * @property {Boolean} [hasAppDataString=false]
            * @readonly
            * @deprecated 1.4 Use nwf.mv.MiiverseDownloadedPost.hasAppData instead.
            * @since 1.0
            */
            hasAppDataString: boolean;
            /**
            * If set to `true`, the post has been given a Yeah by the Active `{@link nwf.act.NintendoAccount Account}`.
            * If set to `false`, it has not.
            *
            * __Note:__ _This will always return `false` unless `nwf.mv.MiiverseSearchParam.empathyAdded` was set to `true` when this post was fetched with `nwf.mv.Miiverse.getPostList`._
            * @property {Boolean} [empathyAdded=false]
            * @readonly
            * @since 1.0
            */
            empathyAdded: boolean;
            /**
             * If set to `true`, the post could contain a spoiler.
             * If set to `false`, it does not.
             * @property {Boolean} [isSpoiler=false]
             * @readonly
             * @since 1.0
             */
            isSpoiler: boolean;
            /**
             * The external URL that is attached to the post.
             * @property {String} [dataURL='']
             * @readonly
             * @since 1.0
             */
            dataURL: string;
            /**
             * Number or replies.
             * @property {Number} [replyCount=0]
             * @readonly
             * @since 1.0
             */
            replyCount: number;
            /**
            * Number of Yeah!(s) for this post.
            * @property {Number} [empathyCount=0]
            * @readonly
            * @since 1.0
            */
            empathyCount: number;
            /**
             * Post ID.
             * @property {String} [id='']
             * @since 1.0
             * @readonly
             */
            id: string;
            /**
             * The `{@link nwf.act.NintendoAccount#principalID principalID}` of the user that uploaded the post.
             * @property {Number} [posterID=0]
             * @since 1.0
             * @readonly
             */
            posterID: number;
            /**
             * Community ID.
             * @property {Number} [communityID=0]
             * @since 1.0
             * @readonly
             */
            communityID: number;
            /**
             * Country Code of the post.
             * @readonly
             * @property {uint8} [countryID=0]
             * @since 1.0
             * @see nwf.system.WiiUCountryCode
             */
            countryID: number;
            /**
             * Language Code of the post.
             * @readonly
             * @property {uint8} [languageID=0]
             * @since 1.0
             * @see nwf.system.WiiULanguageCode
             */
            languageID: number;
            /**
             * Region Code of the post.
             * @readonly
             * @property {Number} [regionID=0]
             * @since 1.0
             * @see nwf.system.WiiURegionCode
             */
            regionID: number;
            /**
             * Body of post.
             * @property {String} [body='']
             * @since 1.0
             * @readonly
             */
            body: string;
            /**
             * Post memo (image).
             * @property {HTMLImageElement} [memo=new Image]
             * @since 1.0
             * @readonly
             */
            memo: HTMLImageElement;
            /**
             * Screenshot from game.
             * `#downloadExternalImageData` must be called before this will return a valid value.
             * @property {HTMLImageElement} [screenshot=new Image]
             * @since 1.0
             * @readonly
             */
            screenshot: HTMLImageElement;
            /**
             * The tag attched to the post.
             * @property {String} [tag='']
             * @since 1.0
             * @readonly
             */
            tag: string;
            /**
            * A `{@link Blob Blob}` of up to 1024 bytes that are saved with the post. This returns `null` if no `appData` exists for this post.
            * @property {null | Blob} [appData=null]
            * @since 1.0
            */
            appData: any;
            /**
            * A string of up to 1024 characters that are saved with the post.
            * This returns `null` if no `appDataString` exists.
            * @property {String} [appDataString='']
            * @since 1.0
            * @readonly
            * @deprecated 1.4 Use nwf.mv.MiiverseDownloadedPost.appData instead.
            */
            appDataString: string;
            /**
             * If set to `true`, the post was created by the current user.
             * If set to `false`, it was not.
             *
             * @property {Boolean} [isMyPost=false]
             * @since 1.8.2
             * @readonly
             */
            isMyPost: boolean;
            /**
             * Expression of the Mii character on the post; also called the `feelingID`.
             * This is the face set on the Mii that will be shown with the post in the Miiverse application.
             * @property {Number} [miiExpression = nwf.mv.MiiverseFeelingType.FEELING_NORMAL]
             * @see nwf.mv.MiiverseFeelingType
             * @since 1.1
             * @readonly
             */
            miiExpression: number;
            /**
             * Mii Screen Name (nickName).
             * @property {String} [miiName='']
             * @since 1.0
             * @readonly
             */
            miiName: string;
            /**
             * Adds empathy (Yeah!) to the post from the current user.
             * @param {Function} callback The callback that will be called when the operation is complete.
             * When this callback has fired the `#empathyAdded` and `#empathyCount` properties of the `MiiverseDownloadedPost` will be updated to reflect the change.
             * @param {Object} callback.event An `Event` object with an additional status property.
             * @param {Number} callback.event.status The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
             * The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
             * @see nwf.mv.Miiverse.addEmpathy
             * @since 1.0
             * @async
             */
            addEmpathy(callback: any): void;
            /**
             * Removes  a previously added empathy (Yeah!) from the post that was added by the current user.
             * @param {Function} callback The callback that will be called when the operation is complete.
             * When this callback has fired the `#empathyAdded` and `#empathyCount` properties of the `MiiverseDownloadedPost` will be updated to reflect the change.
             * @param {Object} callback.event An `Event` object with an additional status property.
             * @param {Number} callback.event.status The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
             * The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
             * @see nwf.mv.Miiverse.removeEmpathy
             * @since 1.7
             * @async
             */
            removeEmpathy(callback: any): void;
            /**
            * Downloads the external image.
            * @param {Function} callback The callback that will be called when the download is complete.
            * @param {Object} callback.event An `Event` object with an additional status property.
            * @param {Number} callback.event.status The status property is 0 on success or an `nwf.system.SystemErrorCode` value on failure.
            * @since 1.0
            * @async
            * @returns {Boolean} Returns `true` if the download started correctly, or `false` if it did not.
            */
            downloadExternalImageData(callback: any): boolean;
            /**
             * Draws the attached memo directly into a provided canvas.
             * The canvas must have dimensions of 320x120 or it will throw an error.
             * @param {HTMLCanvasElement} targetCanvas The canvas that the memo will be drawn in to.
             * @since 1.0.5
             * @see nwf.mv.MiiverseDownloadedComment.memo
             */
            renderMemo(targetCanvas: any): void;
        }
    }
}
declare module nwf {
    module mv {
        class MiiverseDownloadedUserData {
            /**
             * Class contains the structure of a downloaded Miiverse user.
             *
             * @class nwf.mv.MiiverseDownloadedUserData
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * If set to `true`, the user data corresponds to the current user.
             * If set to `false`, it does not.
             *
             * @property {Boolean} [isCurrentUser=false]
             * @since 1.8.2
             * @readonly
             */
            isCurrentUser: boolean;
            /**
             * The Principal ID (PID) of the user.
             * @property {Number} [principalID = 0]
             * @since 1.8.1
             * @readonly
             */
            principalID: number;
            /**
             * Mii Screen Name (nickname).
             * @property {String} [miiName = '']
             * @since 1.8.1
             * @readonly
             */
            miiName: string;
        }
    }
}
declare module nwf {
    module mv {
        /**
         * The Miiverse Upload Post Type.
         *
         * @enum nwf.mv.MiiverseUploadedPostType
         * @author Shawn Gates
         */
        var MiiverseUploadedPostType: {
            FLAG_NONE: number;
            FLAG_WITH_BODY_TEXT: number;
            FLAG_WITH_BODY_MEMO: number;
            FLAG_WITH_APP_DATA: number;
            FLAG_SPOILER: number;
        };
    }
}
declare module nwf {
    module mv {
        /**
         * The Miiverse Feeling Type.
         *
         * @enum nwf.mv.MiiverseFeelingType
         * @author Shawn Gates
         */
        var MiiverseFeelingType: {
            FEELING_NORMAL: number;
            FEELING_HAPPY: number;
            FEELING_COOL: number;
            FEELING_SURPRISED: number;
            FEELING_FRUSTRATED: number;
            FEELING_PUZZLED: number;
        };
    }
}
declare module nwf {
    module mv {
        /**
         * The Miiverse Downloaded Post Type.
         *
         * @enum nwf.mv.MiiverseDownloadedPostType
         * @author Shawn Gates
         */
        var MiiverseDownloadedPostType: {
            FLAG_NONE: number;
            FLAG_WITH_BODY_TEXT: number;
            FLAG_WITH_MEMO: number;
            FLAG_WITH_SCREENSHOT: number;
            FLAG_WITH_EXT_BINARY_DATA: number;
            FLAG_WITH_MII_DATA: number;
            FLAG_WITH_EXTERNAL_URL: number;
            FLAG_WITH_APP_DATA: number;
            FLAG_EMPATHY_ADDED: number;
            FLAG_FREE_FORMAT: number;
            FLAG_SPOILER: number;
        };
    }
}
declare module nwf {
    module mv {
        /**
         * The Miiverse Post Type.
         *
         * @enum nwf.mv.MiiversePostType
         * @author Shawn Gates
         */
        var MiiversePostType: {
            TEXT: string;
            MEMO: string;
        };
    }
}
declare module nwf {
    module mv {
        /**
         * The Miiverse Upload Post Type.
         *
         * @enum nwf.mv.MiiverseUploadPostType
         * @author Shawn Gates
         */
        var MiiverseUploadPostType: {
            FLAG_NONE: number;
            FLAG_SPOILER: number;
            FLAG_TEXT_ONLY: number;
            FLAG_MEMO_ONLY: number;
        };
    }
}
declare module nwf {
    module mv {
        class Miiverse extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the Nintendo Miiverse.
             *
             * Class purpose - Work with Post data
             *
             * **CAUTION:** Please be aware that anything you post to Miiverse when using the included running client application will be visible to **all** Nintendo Web Framework developers.
             *
             * __Note:__ The Miiverse feature must be enabled in the Features page and the Network Access setting in the Network page of Project Settings must NOT be set to disabled for the feature to work and for `nwf.mv` to be defined.
             *
             * __Note:__ Miiverse operations will not take place until all previous Miiverse operations have finished. This may cause a delay if there are multiple Miiverse operations waiting to finish.
             *
             * <div style="color:#aa0000; font-weight:bold;">
             * Do not post any confidential information, including information owned by Nintendo or information related to your own application in development.
             * </div><br />
             *
             * The `Miiverse` class dispatches the following events:
             *
             * - nwf.events.MiiverseEvent.DOWNLOAD_COMMUNITY_FAILED
             * - nwf.events.MiiverseEvent.DOWNLOAD_COMMUNITY_SUCCESS
             * - nwf.events.MiiverseEvent.DOWNLOAD_POST_FAILED
             * - nwf.events.MiiverseEvent.DOWNLOAD_POST_SUCCESS
             * - nwf.events.MiiverseEvent.INITIALIZATION_FAILED
             * - nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS
             * - nwf.events.MiiverseEvent.UPLOAD_POST_FAILED
             * - nwf.events.MiiverseEvent.UPLOAD_POST_SUCCESS
             * - nwf.events.MiiverseEvent.UPLOAD_COMMENT_FAILED
             * - nwf.events.MiiverseEvent.UPLOAD_COMMENT_SUCCESS
             * - nwf.events.MiiverseEvent.DOWNLOAD_COMMENT_FAILED
             * - nwf.events.MiiverseEvent.DOWNLOAD_COMMENT_SUCCESS
             * - nwf.events.MiiverseEvent.DELETE_POST_FAILED
             * - nwf.events.MiiverseEvent.DELETE_POST_SUCCESS
             * - nwf.events.MiiverseEvent.ADD_EMPATHY_FAILED
             * - nwf.events.MiiverseEvent.ADD_EMPATHY_SUCCESS
             * - nwf.events.MiiverseEvent.REMOVE_EMPATHY_FAILED
             * - nwf.events.MiiverseEvent.REMOVE_EMPATHY_SUCCESS
             * - nwf.events.MiiverseEvent.FOLLOW_USER_SUCCESS
             * - nwf.events.MiiverseEvent.FOLLOW_USER_FAILED
             * - nwf.events.MiiverseEvent.UNFOLLOW_USER_SUCCESS
             * - nwf.events.MiiverseEvent.UNFOLLOW_USER_FAILED
             * - nwf.events.MiiverseEvent.DOWNLOAD_USER_DATA_LIST_SUCCESS
             * - nwf.events.MiiverseEvent.DOWNLOAD_USER_DATA_LIST_FAILED
             *
             * @class nwf.mv.Miiverse
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * @private
             * The `new` method is not used to get an instance of a Miiverse object; use #getInstance instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * Returns `true` if the library is ready to begin communicating with the server, or `false` otherwise.
             * @property {Boolean} [isReady=false]
             * @since 1.0
             * @readonly
             */
            isReady: boolean;
            /**
             * Returns an object with details of the post that launched the application.
             * The Miiverse library must be `{@link nwf.mv.Miiverse#initialize initialized}` before this property will return a valid object.
             *
             *      // Get an instance of nwf.mv.Miiverse
             *      var miiverse = nwf.mv.Miiverse.getInstance();
             *
             *      // Add listeners for the Miiverse initialization events
             *      miiverse.addEventListener(nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS, onInit);
             *      miiverse.addEventListener(nwf.events.MiiverseEvent.INITIALIZATION_FAILED, onInit);
             *
             *      // Function to handle the event
             *      function onInit(evt) {
             *          // Now that the Miiverse has initialized we can check the appParams
             *          console.log(miiverse.appParams);
             *      }
             *
             *      // Initialize Miiverse
             *      miiverse.initialize();
             *
             * @property {Object | null} appParams = {postID:null, communityID:null, appData:null}
             * @property {String} appParams.postID = null The ID of the post that launched the application.
             * Will return `null` if the application was not launched from Miiverse.
             * @property {String} appParams.communityID = null The ID of the community that contained the post that launched the application.
             * Will return `null` if the application was not launched from Miiverse.
             * @property {Blob} appParams.appData = null An `appData` object that was attached to the post that launched the application.
             * Will return `null` if the application was not launched from Miiverse.
             * @since 1.8.2
             * @readonly
             */
            appParams: any;
            /**
             * Queries the server and returns a list of Miiverse posts.
             * Only one `getPostList` query can be executed at once.
             * Calling the function again before the `DOWNLOAD_POST_SUCCESS`/`DOWNLOAD_POST_FAILED` event occurs will result in the previous call being canceled.
             * An error may occur if this function is called immediately after exiting the Miiverse post application.
             *
             * @param {nwf.mv.MiiverseSearchParam} searchParam The parameters to query the server with.
             * @returns {Number} Result code.
             * @since 1.0
             * @see nwf.events.MiiverseEvent.DOWNLOAD_POST_SUCCESS
             * @see nwf.events.MiiverseEvent.DOWNLOAD_POST_FAILED
             * @async
             */
            getPostList(searchParam: any): number;
            /**
             * Queries the server and returns a list of Miiverse communities.
             * Only one `getCommunityList` query can be executed at once.
             * Calling the function again before the `DOWNLOAD_COMMUNITY_SUCCESS`/`DOWNLOAD_COMMUNITY_FAILED` event occurs will result in the previous call being canceled.
             * An error may occur if this function is called immediately after exiting the Miiverse post application.
             *
             * @param {nwf.mv.MiiverseCommunitySearchParam} searchParam The parameters to query the server with.
             * @returns {Number} Result code.
             * @since 1.2
             * @see nwf.events.MiiverseEvent.DOWNLOAD_COMMUNITY_SUCCESS
             * @see nwf.events.MiiverseEvent.DOWNLOAD_COMMUNITY_FAILED
             * @async
             */
            getCommunityList(searchParam: any): number;
            /**
             * Posts a message to the Miiverse.
             * Calling this method will open the Miiverse posting application.
             * The current application will be paused while the posting application is open until the user completes the posting process or cancels.
             * If the user cancels the posting, an `nwf.events.MiiverseEvent.UPLOAD_POST_FAILED` event will be dispatched.
             *
             * @param {nwf.mv.MiiverseUploadPost} post The post to send to the server.
             * @returns {Number} Result code.
             * @since 1.0
             * @see nwf.events.MiiverseEvent.UPLOAD_POST_SUCCESS
             * @see nwf.events.MiiverseEvent.UPLOAD_POST_FAILED
             * @async
             */
            sendPost(post: any): number;
            /**
             * Forcibly terminates the current send/receive operation.
             * Call this function when the operation stops responding for a long period.
             *
             * @returns {Boolean} Returns `true` if the cancel succeeds, or `false` otherwise.
             * @since 1.0
             */
            cancelOperation(): boolean;
            /**
             * Initializes the Miiverse library.
             * This must be called before other functions are called.
             * The Miiverse library can only be initialized once while the application is running.
             * @param {Number} [maxPostCount=30] The maximum number of posts that can be downloaded from one call to `getPostList`.
             *                                   This value affects the amount of memory that Miiverse allocates before initializing.
             * @returns {null}
             * @since 1.0
             * @see nwf.events.MiiverseEvent.INITIALIZATION_SUCCESS
             * @see nwf.events.MiiverseEvent.INITIALIZATION_FAILED
             * @async
             */
            initialize(maxPostCount?: number): void;
            /**
             * Launches the Miiverse application.
             * Takes an object that can point the Miiverse application to a specific page.
             *
             * @param {Object} [startParam=null] Only one of this objects properties can be used at a time.
             * If more than one property is present in the parameter object, they will be prioritized in alphabetical order (`community`, `postID`, `user`).
             * @param {Number} [startParam.community=0] The target community to view.
             * @param {String} [startParam.postID="somePostID"] The id of a specific post to view.
             * @param {Number} [startParam.user=0] The id of a user profile to view.
             * @returns {Number} Result code.
             * @since 1.0
             */
            launchPortal(startParam?: any): number;
            /**
             * Posts a comment in response to a post.
             * Calling this method will open the Miiverse posting application.
             * The current application will be paused while the posting application is open until the user completes the posting process or cancels.
             * If the user cancels the posting, an `nwf.events.MiiverseEvent.UPLOAD_COMMENT_FAILED` event will be dispatched.
             *
             * @param {nwf.mv.MiiverseUploadComment} comment The comment to send to the server.
             * @returns {Number} Result code.
             * @since 1.4
             * @see nwf.events.MiiverseEvent.UPLOAD_COMMENT_SUCCESS
             * @see nwf.events.MiiverseEvent.UPLOAD_COMMENT_FAILED
             * @async
             */
            sendComment(comment: any): number;
            /**
             * Queries the server and returns a list of Miiverse comments in response to a post.
             * Only one `getCommentList` query can be executed at once.
             * Calling the function again before the `DOWNLOAD_COMMENT_SUCCESS`/`DOWNLOAD_COMMENT_FAILED` event occurs will result in the previous call being canceled.
             * An error may occur if this function is called immediately after exiting the Miiverse post application.
             *
             * @param {nwf.mv.MiiverseCommentSearchParam} searchParam The parameters to query the server with.
             * @returns {Number} Result code.
             * @since 1.4
             * @see nwf.events.MiiverseEvent.DOWNLOAD_COMMENT_SUCCESS
             * @see nwf.events.MiiverseEvent.DOWNLOAD_COMMENT_FAILED
             * @async
             */
            getCommentList(searchParam: any): number;
            /**
             * Deletes a post from the server.
             * That post must belong to the current user or an error will occur.
             * Calling the function again before the `DELETE_POST_SUCCESS`/`DELETE_POST_FAILED` event occurs will result in the previous call being canceled.
             *
             * @param {String} postID The post to be deleted.
             * @returns {Number} Result code.
             * @since 1.4.5
             * @see nwf.events.MiiverseEvent.DELETE_POST_SUCCESS
             * @see nwf.events.MiiverseEvent.DELETE_POST_FAILED
             * @async
             */
            deletePost(postID: string): number;
            /**
             * Adds empathy (Yeah!) to the specified post.
             * @param {String} postID The `{@link nwf.mv.MiiverseDownloadedPost#id id}` of the `{@link nwf.mv.MiiverseDownloadedPost post}` to add empathy to.
             * @see nwf.mv.MiiverseDownloadedPost.addEmpathy
             * @see nwf.events.MiiverseEvent.ADD_EMPATHY_SUCCESS
             * @see nwf.events.MiiverseEvent.ADD_EMPATHY_FAILED
             * @since 1.7
             * @async
             */
            addEmpathy(postID: string): void;
            /**
             * Removes a previously added empathy (Yeah!) that was added by the current user from the specified post.
             * @param {String} postID The `{@link nwf.mv.MiiverseDownloadedPost#id id}` of the `{@link nwf.mv.MiiverseDownloadedPost post}` to remove empathy from.
             * @see nwf.mv.MiiverseDownloadedPost.removeEmpathy
             * @see nwf.events.MiiverseEvent.REMOVE_EMPATHY_SUCCESS
             * @see nwf.events.MiiverseEvent.REMOVE_EMPATHY_FAILED
             * @since 1.7
             * @async
             */
            removeEmpathy(postID: string): void;
            /**
             * Follows the specified user's Miiverse posts.
             * @param {Number} principalID The `{@link nwf.act.NintendoAccount#principalID principalID}` of the user to follow.
             * @returns {Number} Result code.
             * @see nwf.events.MiiverseEvent.FOLLOW_USER_SUCCESS
             * @see nwf.events.MiiverseEvent.FOLLOW_USER_FAILED
             * @since 1.7
             * @async
             */
            followUser(principalID: number): number;
            /**
             * Unfollows the specified user's Miiverse posts.
             * @param {Number} principalID The `{@link nwf.act.NintendoAccount#principalID principalID}` of the user to unfollow.
             * @returns {Number} Result code.
             * @see nwf.events.MiiverseEvent.UNFOLLOW_USER_SUCCESS
             * @see nwf.events.MiiverseEvent.UNFOLLOW_USER_FAILED
             * @since 1.7
             * @async
             */
            unfollowUser(principalID: number): number;
            /**
             * Queries the server and returns a list of `nwf.mv.MiiverseDownloadedUserData` objects.
             * Only one `downloadUserData` query can be executed at once.
             * Calling the function again before the `DOWNLOAD_USER_DATA_LIST_SUCCESS`/`DOWNLOAD_USER_DATA_LIST_FAILED` event occurs will result in the previous call being canceled.
             *
             * @param {nwf.mv.MiiverseUserDataSearchParam} searchParam The parameters to query the server with.
             * @returns {Number} Result code.
             * @since 1.8.2
             * @see nwf.events.MiiverseEvent.DOWNLOAD_USER_DATA_LIST_SUCCESS
             * @see nwf.events.MiiverseEvent.DOWNLOAD_USER_DATA_LIST_FAILED
             * @async
             */
            downloadUserData(searchParam: any): number;
            /**
             * Accesses an instance of the `Miiverse` singleton.
             *
             * @method getInstance
             * @returns {nwf.mv.Miiverse} The `Miiverse` singleton instance.
             * @since 1.0
             * @static
             */
            static getInstance(): Miiverse;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @static
             * @since 1.0
             */
            static isSupported(): boolean;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    module net {
        /**
         * Network class for setting global networking parameters.
         *
         * @enum nwf.net.NetworkState
         * @author Cory O'Regan
         * @author Shawn Gates
         */
        var NetworkState: {
            CONNECTED: number;
            OFFLINE: number;
            CONNECTING: number;
        };
    }
}
declare module nwf {
    module net {
        class NintendoCACert {
            /**
             * The `NintendoCACert` class can be used to add Nintendo CA certificates to the certificate bundle.
             *
             * __Note:__ The Nintendo CA Cert feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.net.NintendoCACert` to be defined.
             *
             * @author Cory O'Regan
             * @author Shawn Gates
             * @class nwf.net.NintendoCACert
             */
            /**
             * @property {int} [NINTENDO_CA=100]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CA: number;
            /**
             * @property {int} [NINTENDO_CA_G2=101]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CA_G2: number;
            /**
             * @property {int} [NINTENDO_CA_G3=102]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CA_G3: number;
            /**
             * @property {int} [NINTENDO_CLASS2_CA=103]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CLASS2_CA: number;
            /**
             * @property {int} [NINTENDO_CLASS2_CA_G2=104]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CLASS2_CA_G2: number;
            /**
             * @property {int} [NINTENDO_CLASS2_CA_G3=105]
             * @since 1.4
             * @static @constant
             */
            NINTENDO_CLASS2_CA_G3: number;
            /**
             * Adds a Nintendo CA certificate to the current CA certificate bundle.
             *
             * @method addNintendoCACert
             * @returns {Boolean} Returns `true` if the Nintendo CA certificate was added to the bundle successfully, or `false` if the process failed.
             * @param {int} certificateIdx Index of Nintendo CA certificate as defined by the nwf.net.NintendoCACert constants.
             * @static
             * @since 1.4
             */
            addNintendoCACert(): boolean;
        }
    }
}
declare module nwf {
    module events {
        class NetworkEvent extends Event {
            /**
             * A `NetworkEvent` object is triggered when a noteworthy event has happened regarding the network connection.
             *
             * @class nwf.events.NetworkEvent
             * @see {@link nwf.net.Network}
             * @extends nwf.events.Event
             * @author Cory O'Regan
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the system successfully connects to the network.
             *
             * _Note: #CONNECTED will fire once immediately when a listener is added if the system is already connected to the network._
             *
             * @property {string} [CONNECTED='networkConnected']
             * @since 1.4
             * @static @constant
             */
            static CONNECTED: string;
            /**
             * Dispatched when the system is disconnected from the network.
             * @property {string} [DISCONNECTED='networkDisconnected']
             * @since 1.4
             * @static @constant
             */
            static DISCONNECTED: string;
            /**
             * Dispatched when the system has failed to connect to the network. The system will continue reconnection attempts until nwf.net.Network#workOffline() is called or a connection is made successfully.
             * @property {string} [FAILED_TO_CONNECT='networkFailedToConnect']
             * @since 1.4
             * @static @constant
             */
            static FAILED_TO_CONNECT: string;
        }
    }
}
declare module nwf {
    module events {
        /**
         * A `NetworkEvent` object is triggered when a noteworthy event has happened regarding the network connection.
         *
         * @class nwf.events.NetworkManagerEvent
         * @see {@link nwf.net.NetworkManager}
         * @extends nwf.events.Event
         * @author Nate Long
         * @lib SupportLibraries.js
         */
        class NetworkManagerEvent extends Event {
            /**
             * Dispatched when the system successfully connects to the network and fetches an Independent Service Token.
             *
             * @property {string} [CONNECT='connect']
             * @since 1.8.3
             * @static @constant
             */
            static CONNECT: string;
            /**
             * Dispatched when the system is disconnected from the network.  The library will attempt to reconnect once, then call nwf.net.Network#workOffline().
             * @property {string} [DISCONNECTED='disconnect']
             * @since 1.8.3
             * @static @constant
             */
            static DISCONNECT: string;
            /**
             * Dispatched when the system has failed to connect to the network or has failed to retrieve an Independent Service Token.
             * @property {string} [FAIL='fail']
             * @since 1.8.3
             * @static @constant
             */
            static FAIL: string;
        }
    }
}
declare module nwf {
    module net {
        /**
         * The Network Manager is provided as an optional library to aid implementation and guideline compliance for basic network connection handling.
         * The library automatically handles independent server token acquisition, network connection initialization, and connection status handling.
         *
         * This library can be used in conjunction with the {@link nwf.system.ErrorManager Error Manager} library to ensure that errors reported by the networking interface are handled correctly.
         *
         * The `NetworkManager` class dispatches the following events:
         *
         * - nwf.events.NetworkManagerEvent.CONNECT
         * - nwf.events.NetworkManagerEvent.DISCONNECTED
         * - nwf.events.NetworkManagerEvent.FAIL
         *
         * Usage
         * ---
         *
         * Applications can use this library without modification by including the library in the main HTML file as follows:
         *
         * <script src="path/to/SupportLibraries.min.js"></script>
         * <script>
         *     function onNetworkConnect() {
         *         // Start processing the application
         *     }
         *
         *     function onNetworkFail() {
         *         // Handle the failure to connect to the network
         *     }
         *
         *     nwf.net.NetworkManager.addEventListener(nwf.events.NetworkManagerEvent.FAIL, onNetworkFail);
         *     nwf.net.NetworkManager.addEventListener(nwf.events.NetworkManagerEvent.CONNECT, onNetworkConnect);
         *
         *     nwf.net.NetworkManager.initialize();
         * </script>
         *
         * The library will fire 3 events: CONNECT, DISCONNECT, and FAIL, each corresponding to an event on the network interface.
         * Most applications just need to listen for CONNECT and FAIL, so they know the final result of the initialization process, but some applications may want to listen for DISCONNECT as well in order to react to a loss of connection.
         *
         * @author Nate Long
         * @author Shawn Gates
         * @class nwf.net.NetworkManager
         * @lib SupportLibraries.js
         */
        class NetworkManager {
            /**
             * Initialize the connection manager.
             *
             * @method initialize
             * @static
             * @since 1.8.3
             */
            static initialize(): void;
            /**
             * This property is set to `true` if the network is connected, `false` if it is not, or `null` if the connection state is unknown.
             * @property {boolean} [isConnected=null]
             * @static
             */
            isConnected: boolean;
            /**
             * Registers an event listener handler so that the listener can be notified when events are dispatched. Subsequent calls to `addEventListener` with a different listener and/or scope will result in the separate registration of the listener.
             *
             * To prevent possible memory leaks, when you no longer need an event listener, remove it by calling `#removeEventListener` or `#removeAllEventListeners`. This is especially true when switching contexts by changing pages.
             *
             * _If multiple identical `EventListeners` are registered on the same `EventTarget` with the same parameters, the duplicate instances are discarded._
             *
             * @param {String} type The event type for which the user is registering.
             * @param {Function} listener  The listener function that processes the event. This function must accept an `Event` object as its only parameter.
             * @param {Object} [scope=null]  The scope on which to apply the listener call. This will affect the value of `this` within the listener function block. By default the scope will be set to the window or "root" scope of the dispatcher object. Do not use this parameter when in strict mode, as it will cause an error.
             * @static
             * @since 1.8.3
             */
            addEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Allows the removal of event listeners from the event target.
             *
             * _The `listener` function and `scope` must match that which was used to register the event._
             *
             * @see {@link #removeAllEventListeners}
             * @param {String} type Specifies the event type of the `EventListener` being removed.
             * @param {Function} listener  The listener function to be removed.
             * @param {Object} [scope=null]  The scope object of the `EventListener` being removed. If a listener was registered twice with different scopes, each must be removed separately.
             * @static
             * @since 1.8.3
             */
            removeEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Removes **ALL** event listeners from the event target. Always double-check to make sure you really want to remove every event listener.
             * @static
             * @since 1.8.3
             */
            removeAllEventListeners(): void;
            /**
             * Checks whether the `EventDispatcher` object has any listeners registered for a specific type of event.
             * @param {String} type The type of event to check.
             * @returns {Boolean} Returns `true` if a listener of the specified type is registered, or `false` otherwise.
             * @static
             * @since 1.8.3
             */
            hasEventListener(type: any): boolean;
        }
    }
}
declare module nwf {
    module net {
        class Network extends nwf.events.EventDispatcher {
            /**
             * Network class for setting global networking parameters.
             *
             * __Note:__  The Network Access setting in the Network page of Project Settings must NOT be set to disabled for the feature to work and for `nwf.net` to be defined.
             *
             * The `Network` class dispatches the following events:
             *
             * - nwf.events.NetworkEvent.CONNECTED
             * - nwf.events.NetworkEvent.DISCONNECTED
             * - nwf.events.NetworkEvent.FAILED_TO_CONNECT
             *
             * @author Ryan Lynd
             * @author Cory O'Regan
             * @author Shawn Gates
             * @class nwf.net.Network
             * @extends nwf.events.EventDispatcher
             * @singleton
             */
            /**
            * @private
            * The `new` method is not used to get an instance of the `Network` singleton; use `#getInstance` instead.
            * @method constructor
            * @since 1.4
            */
            constructor();
            /**
             * Cancels a connection that is either pending or active.
             *
             * @method forceCancelConnection
             * @param {String} url URL of the connection to cancel.
             * @static
             * @since 1.0
             */
            static forceCancelConnection(url: string): void;
            /**
             * Gets the user-agent string used in all HTTP(S) requests.
             *
             * @method getUserAgent
             * @returns {String} The user-agent
             * @static
             * @since 1.0
             */
            static getUserAgent(): string;
            /**
             * Specifies the user-agent string to be used in all HTTP(S) requests.
             *
             * __Note:__ _Please do not release any confidential information when changing the user-agent string._
             *
             * @method setUserAgent
             * @param {String} userAgent The value to set as the user-agent.
             * @static
             * @since 1.0
             */
            static setUserAgent(userAgent: string): void;
            /**
             * Indicates whether network connectivity exists and it is possible to establish connections and pass data.
             *
             * @method isConnected
             * @returns {Boolean} Returns `true` if connectivity exists to the connection point, or `false` otherwise.
             * @static
             * @since 1.0
             */
            static isConnected(): boolean;
            /**
            * In the case of a network interruption, the normal behavior is for the framework to automatically attempt to reestablish a connection.
            * With each failed attempt, the application may be alerted of the failure.
            * If this method is called, the framework will no longer attempt to reestablish the connection.
            *
            * @method workOffline
            * @returns {Boolean} Returns `true` if the automatic reconnection process was successfully ceased, or `false` if the framework currently has a network connection.
            * @static
            * @since 1.0
            */
            static workOffline(): void;
            /**
            * If there was previously a network interruption and the `#workOffline()` method was called, call this method to resume automatic reconnection.
            * Just like before calling the `#workOffline()` method, the framework will repeatedly attempt to establish a connection to the network, alerting the application for each attempt that may fail.
            *
            * @method reconnect
            * @returns {Boolean} Returns `true` if the automatic reconnection process has started successfully, or `false` if the framework is already connected or is attempting to reconnect.
            * @static
            * @since 1.0
            */
            static reconnect(): boolean;
            /**
             * The Internet Protocol version 4 (IPv4) address of the system.
             *
             * @method getIPv4
             * @returns {String} IPv4 address of current connection.
             * @static
             * @since 1.0
             */
            static getIPv4(): boolean;
            /**
             * Gets the current state of the network connection.
             *
             * @method getState
             * @returns {int} An integer representation of the current network state represented by nwf.net.NetworkState.
             * @static
             * @since 1.4
             */
            static getState(): number;
            /**
             * Adds header information to all outgoing HTTP(S) requests.
             *
             * @method addHeader
             * @param {String} name Header name.
             * @param {String} value Header value.
             * @static
             * @since 1.0
             */
            static addHeader(name: string, value: string): void;
            /**
             * Removes a specific header from HTTP(S) requests.
             *
             * @method removeHeader
             * @param {String} name Header name to remove.
             * @static
             * @since 1.0
             */
            static removeHeader(name: string): void;
            /**
             * Removes all added headers from HTTP(S) requests.
             *
             * @method removeAllHeaders
             * @static
             * @since 1.0
             */
            static removeAllHeaders(): void;
            /**
             * Adds a WWW-Authenticate Username and Password to all connections made to a specific domain.
             *
             *     var Network = nwf.net.Network;
             *     // All calls to https://www.some-domain.com will use Authenticate with "mario" - "princess".
             *     Network.addAuthenticateMapping( 'https://*.some-domain.com', 'mario', 'princess');
             *
             * @method addAuthenticateMapping
             * @static
             * @param {String} domain Reference to domain and subdomain. "*" will add to all domains or all subdomains.
             * @param {String} username Username.
             * @param {String} password Unencrypted password.
             * @since 1.0
             */
            static addAuthenticateMapping(domain: string, username: string, password: string): void;
            /**
             * Adds a CA certificate to the current CA certificate bundle.
             *
             * __Note:__ When using this method, the certificate is saved in a file located at `/save/common/temp/ca-bundle.pem`. Make sure to take this file into account when calculating save data sizes.
             *
             * @method addCACert
             * @returns {Boolean} Returns `true` if the new CA certificate was added to the bundle successfully, or `false` if it did not.
             * @param {String} certificate PEM format x509 SSL certificate.
             * @static
             * @since 1.2
             */
            static addCACert(): boolean;
            /**
            * Accesses an instance of the `Network` singleton.
            *
            * @method getInstance
            * @returns {nwf.net.Network} The `Network` singleton instance.
            * @static
            * @since 1.4
            */
            static getInstance(): Network;
            /**@ignore*/
            private static s_instance;
        }
    }
}
declare module nwf {
    module events {
        class GameServerEvent extends Event {
            /**
             * Events dispatched by the `GameServer` class.
             *
             * @class nwf.events.GameServerEvent
             * @see {@link nwf.nex.GameServer}
             * @extends nwf.events.Event
             * @author Aaron Ward
             * @author Shawn Gates
             */
            constructor();
            /**
             * A unique ID provided by the server, typically for identifying a user. This could allow multiple "profiles" to be present for a single principal ID.
             * This ID should be stored by the application.
             * See the Cafe NEX documentation for more information on using unique IDs.
             *
             * Only set when `nwf.events.GameServerEvent.REQUEST_ID_SUCCESS` is dispatched.
             * @property {String} [uniqueID='']
             * @readonly
             * @since 1.4
             */
            uniqueID: string;
            /**
            * Dispatched when the connection to the Game Server is severed for any reason.
            * @property {String} [DISCONNECTED='gameServerDisconnected']
            * @static @constant
            * @since 1.4
            */
            static DISCONNECTED: string;
            /**
            * Dispatched when a call made to `nwf.nex.GameServer.login` is successful.
            * @property {String} [LOGIN_SUCCESS='gameServerLoginSuccess']
            * @static @constant
            * @since 1.4
            */
            static LOGIN_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.GameServer.login` fails.
            * @property {String} [LOGIN_FAILED='gameServerLoginFailed']
            * @static @constant
            * @since 1.4
            */
            static LOGIN_FAILED: string;
            /**
            * Dispatched when a call made to `nwf.nex.GameServer.requestUniqueID` is successful.
            * @property {String} [REQUEST_ID_SUCCESS='gameServerRequestUniqueIDSuccess']
            * @static @constant
            * @since 1.4
            */
            static REQUEST_ID_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.GameServer.requestUniqueID` fails.
            * @property {String} [REQUEST_ID_FAILED='gameServerRequestUniqueIDFailed']
            * @static @constant
            * @since 1.4
            */
            static REQUEST_ID_FAILED: string;
        }
    }
}
declare module nwf {
    module nex {
        class GameServer extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the NEX Game Server.
             *
             * Class purpose - Connects to the NEX Game Server
             *
             * __Note:__ The NEX Game Server feature must be enabled in the Features page and the Network Access setting in the Network page of Project Settings must NOT be set to disabled for the feature to work and for `nwf.nex` to be defined.
             *
             * The `GameServer` class dispatches the following events:
             *
             * - nwf.events.GameServerEvent.DISCONNECTED
             * - nwf.events.GameServerEvent.LOGIN_FAILED
             * - nwf.events.GameServerEvent.LOGIN_SUCCESS
             * - nwf.events.GameServerEvent.REQUEST_ID_FAILED
             * - nwf.events.GameServerEvent.REQUEST_ID_SUCCESS
             *
             * @class nwf.nex.GameServer
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
            * @private
            * The `new` method is not used to get an instance of a `GameServer` object; use `#getInstance` instead.
            * @method constructor
            * @since 1.4
            */
            constructor();
            /**
             * Returns `true` if the library is ready to begin communicating with the server, or `false` if it is not.
             * @property {Boolean} [isLoggedIn=false]
             * @since 1.4
             * @readonly
             */
            isLoggedIn: boolean;
            /**
             * Gets the current time (in `UTC`) of the NEX Game Server.
             *
             * __Note:__ _Must have logged on to the Game Server or this will return `null`. Will continue to return a valid time even after the conection to the Game Server has been terminated._
             * @property {Date} [gameServerTime=null]
             * @since 1.6
             * @readonly
             */
            gameServerTime: any;
            /**
            * Gets the current time (in `UTC`) of the Nintendo Account Server.
             *
             * __Note:__ _Must be logged on to the Game Server or this will return `null`._
             * @property {Date} [accountServerTime=null]
             * @since 1.6
             * @readonly
             */
            accountServerTime: any;
            /**
             * Logs into the Game Server
             * @returns {null}
             * @since 1.4
             * @see nwf.events.GameServerEvent.LOGIN_SUCCESS
             * @see nwf.events.GameServerEvent.LOGIN_FAILED
             * @async
             */
            login(): void;
            /**
             * Requests a unique ID to be issued by the Game Server.
             * @returns {null}
             * @since 1.4
             * @see nwf.events.GameServerEvent.REQUEST_ID_SUCCESS
             * @see nwf.events.GameServerEvent.REQUEST_ID_FAILED
             * @async
             */
            requestUniqueID(): void;
            /**
             * Accesses an instance of the `GameServer` singleton.
             *
             * @method getInstance
             * @returns {nwf.nex.GameServer} The `GameServer` singleton instance.
             * @since 1.4
             * @static
             */
            static getInstance(): GameServer;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @static
             * @since 1.4
             */
            static isSupported(): boolean;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreDownloadedObject {
            /**
             * Class containing the structure of a downloaded Data Store post.
             *
             * @class nwf.nex.DataStoreDownloadedObject
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * The data returned from the server.
             * @property {Blob} [data=new Blob]
             * @readonly
             * @since 1.2
             */
            data: Blob;
            /**
             * The ID of the data from the server.
             * @property {String} [dataID='']
             * @readonly
             * @since 1.2
             */
            dataID: string;
            /**
             * The principal ID of the person who uploaded the data.
             * @property {Number} [ownerId=0]
             * @readonly
             * @since 1.2
             */
            ownerId: number;
            /**
             * The type of the data. This value is set when a `{@link nwf.nex.DataStoreUploadObject#dataType DataStoreUploadObject}` is created.
             * @property {Number} [dataType=0x0000]
             * @readonly
             * @since 1.2
             */
            dataType: number;
            /**
            * The title of the data.
            * @property {String} [name='']
            * @readonly
            * @since 1.2
            */
            name: string;
            /**
            * The number of remaining valid days.
            * @property {Number} [period=0]
            * @readonly
            * @since 1.2
            */
            period: number;
            /**
            * An array of strings that can index the data for searches.
            * @property {Array} [tags=[]]
            * @readonly
            * @since 1.2
            */
            tags: string[];
            /**
            * Returns `true` when this object is valid, or `false` if it is not valid.
            * @property {Boolean} [isValid=true]
            * @readonly
            * @since 1.2
            */
            isValid: boolean;
            /**
            * The permission status controlling what users can access this data.
            * @property {Number} [accessPermissionStatus=0]
            * @readonly
            * @since 1.4
            */
            accessPermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to access this data. If `#accessPermissionStatus` is not `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND` then this is an empty array.
            * @property {Array} [accessPermissionRecipientIDs=[]]
            * @readonly
            * @since 1.4
            */
            accessPermissionRecipientIDs: any[];
            /**
            * The permission status controlling what users can update/delete this data.
            * @property {Number} [updatePermissionStatus=0]
            * @readonly
            * @since 1.4
            */
            updatePermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to update/delete this data. If `#updatePermissionStatus` is not `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND` then this is an empty array.
            * @property {Array} [updatePermissionRecipientIDs=[]]
            * @readonly
            * @since 1.4
            */
            updatePermissionRecipientIDs: any[];
            /**
             * A 1024-byte chunk of data that is attached to the meta info of a post.
             * @property {Blob} [metaBinary= new Blob]
             * @readonly
             * @since 1.4
             */
            metaBinary: Blob;
            /**
            * The date on which the data was created.
            * @property {Date} [createdTime=new Date]
            * @readonly
            * @since 1.4
            */
            createdTime: Date;
            /**
            * The date on which the data was last updated.
            * @property {Date} [updatedTime=new Date]
            * @readonly
            * @since 1.4
            */
            updatedTime: Date;
            /**
            * The date on which the data will expire.
            * @property {Date} [expireTime=new Date]
            * @readonly
            * @since 1.4
            */
            expireTime: Date;
            /**
            * The approval status of the uploaded object.
            * @property {nwf.nex.DataStoreObjectStatus} [status=nwf.nex.DataStoreObjectStatus.STATUS_NORMAL]
            * @readonly
            * @since 1.4
            */
            status: number;
            /**
            * How many times this data has been downloaded.
            * @property {Number} [downloadCount=0]
            * @readonly
            * @since 1.4
            * @removed 1.5 This property was removed in NEX version 3.5.1.
            */
            downloadCount: number;
            /**
            * An associated dataID.
            * @property {Number} [referDataID=0]
            * @readonly
            * @since 1.4
            */
            referDataID: number;
            /**
            * Flags set when the data was uploaded.
            * @property {Number} [dataFlag=nwf.nex.DataStoreDataFlag.FLAG_NONE]
            * @readonly
            * @see nwf.nex.DataStoreDataFlag.FLAG_NONE
            * @since 1.4
            */
            dataFlag: number;
            /**
            * An array of nwf.nex.DataStoreRating objects representing the ratings in each of 16 potential slots.
            * @property {Array} [ratings=[]]
            * @readonly
            * @since 1.4
            */
            ratings: any[];
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreMetaCompareParam {
            /**
             * Class containing the structure of a MetaCompareParameter object. This class is used to specify what meta information will be compared when using the `{@link nwf.nex.DataStore#updateData nwf.nex.DataStore.updateData()}` method to update an object.
             * If any of the new meta information does not match the server data based on the specified properties, the update will fail.
             *
             *      // Create a DataStoreMetaCompareParam and set the properties to compare
             *      var compareParam = new nwf.nex.DataStoreMetaCompareParam();
             *      compareParam.name = 'objectName';
             *      compareParam.compareName = true;
             *
             *      // Pass the compare param to the updateData method
             *      nwf.nex.DataStore.getInstance().updateData(dataID, post, compareParam);
             *
             * @class nwf.nex.DataStoreMetaCompareParam
             * @author Shawn Gates
             */
            /**
             * Creates a new DataStoreMetaCompareParam object.
             * @method constructor
             * @since 1.7
             */
            constructor();
            /**
            * The title of the data.
            * @property {String} [name='']
            * @see nwf.nex.DataStoreDownloadedObject.name
            * @since 1.7
            */
            name: string;
            /**
             * The type of the data. This value is set when a `{@link nwf.nex.DataStoreUploadObject#dataType DataStoreUploadObject}` is created.
             * @property {Number} [dataType=0x0000]
             * @see nwf.nex.DataStoreDownloadedObject.dataType
             * @since 1.7
             */
            dataType: number;
            /**
            * The number of remaining valid days on the data.
            * @property {Number} [period=90]
            * @see nwf.nex.DataStoreDownloadedObject.period
            * @since 1.7
            */
            period: number;
            /**
            * An array of strings that can index the data for searches.
            * @property {Array} [tags=[]]
            * @see nwf.nex.DataStoreDownloadedObject.tags
            * @since 1.7
            */
            tags: any;
            /**
            * The permission status controlling what users can access the data.
            * @property {Number} [accessPermissionStatus=nwf.nex.DataStorePermission.PRIVATE]
            * @see nwf.nex.DataStoreDownloadedObject.accessPermissionStatus
            * @since 1.7
            */
            accessPermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to access the data.
            * @property {Array} [accessPermissionRecipientIDs=[]]
            * @see nwf.nex.DataStoreDownloadedObject.accessPermissionRecipientIDs
            * @since 1.7
            */
            accessPermissionRecipientIDs: any;
            /**
            * The permission status controlling what users can update/delete the data.
            * @property {Number} [updatePermissionStatus=nwf.nex.DataStorePermission.PRIVATE]
            * @see nwf.nex.DataStoreDownloadedObject.updatePermissionStatus
            * @since 1.7
            */
            updatePermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to update/delete the data.
            * @property {Array} [updatePermissionRecipientIDs=[]]
            * @see nwf.nex.DataStoreDownloadedObject.updatePermissionRecipientIDs
            * @since 1.7
            */
            updatePermissionRecipientIDs: any;
            /**
             * A 1024-byte chunk of data that is attached to the meta info of the data.
             * @property {Blob} [metaBinary=null]
             * @see nwf.nex.DataStoreDownloadedObject.metaBinary
             * @since 1.7
             */
            metaBinary: any;
            /**
           * The approval status of the data.
           * @property {Number} [status=nwf.nex.DataStoreObjectStatus.STATUS_NORMAL]
           * @see nwf.nex.DataStoreDownloadedObject.status
           * @since 1.7
           */
            status: number;
            /**
             * Sets which properties to compare to the data on the server.  Combine different filters using binary operators.
             *
             * Ex: `compareParam.comparisonFlag = {@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_NAME} | {@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_PERIOD}`
             *
             * This property will also be changed based on the `boolean` properties of the `DataStoreMetaCompareParam` object.
             * @property {Number} [comparisonFlag=nwf.nex.DataStoreMetaCompareFlag.COMPARISON_FLAG_NONE]
             * @since 1.7
             */
            comparisonFlag: number;
            /**
             * If set to `true`, compare the data on the server using the `#name` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_NAME}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareName=false]
             * @since 1.7
             */
            compareName: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#accessPermissionStatus` and `#accessPermissionRecipientIDs` properties. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_ACCESS_PERMISSION}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareAccessPermission=false]
             * @since 1.7
             */
            compareAccessPermission: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#updatePermissionStatus` and `#updatePermissionRecipientIDs` properties. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_UPDATE_PERMISSION}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareUpdatePermission=false]
             * @since 1.7
             */
            compareUpdatePermission: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#period` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_PERIOD}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [comparePeriod=false]
             * @since 1.7
             */
            comparePeriod: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#metaBinary` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_METABINARY}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareMetaBinary=false]
             * @since 1.7
             */
            compareMetaBinary: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#tags` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_TAGS}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareTags=false]
             * @since 1.7
             */
            compareTags: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#dataType` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_DATA_TYPE}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareDataType=false]
             * @since 1.7
             */
            compareDataType: boolean;
            /**
             * If set to `true`, compare the data on the server using the `#status` property. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_STATUS}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareStatus=false]
             * @since 1.7
             */
            compareStatus: boolean;
            /**
             * If set to `true`, compare the data on the server using all the properties. If set to `false`, do not. Setting this to `true` will add the value of `{@link nwf.nex.DataStoreMetaCompareFlag#COMPARISON_FLAG_ALL}` to the `#comparisonFlag` property; setting it to `false` will subtract the value from the property.
             * @property {Boolean} [compareAll=false]
             * @since 1.7
             */
            compareAll: boolean;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreRating {
            /**
             * Class defining the parameters of a Data Store rating.
             *
             * @class nwf.nex.DataStoreRating
             * @author Ryan Lynd
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * The ID of the rated data from the server.
             * @property {String} [dataID='']
             * @readonly
             * @since 1.4
             */
            dataID: string;
            /**
             * The ratings slot to which this rating correlates.
             * @property {uint32} [slotID=0]
             * @readonly
             * @since 1.4
             */
            slotID: number;
            /**
             * The total value of all ratings combined.
             * @property {uint32} [totalValue=0]
             * @readonly
             * @since 1.4
             */
            totalValue: number;
            /**
             * The total number of individual ratings that comprise `#totalValue`.
             * @property {uint32} [ratingCount=0]
             * @readonly
             * @since 1.4
             */
            ratingCount: number;
            /**
             * The initial value of the rating when it was first uploaded.
             * @property {uint32} [initialValue=0]
             * @readonly
             * @since 1.4
             */
            initialValue: number;
            /**
             * The average rating. Equal to `#totalValue/#ratingCount`.
             * @property {uint32} [averageValue=0]
             * @readonly
             * @since 1.4
             */
            averageValue: number;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreRatingInitParam {
            /**
             * Class defining the settings of a Data Store object rating.
             *
             * @class nwf.nex.DataStoreRatingInitParam
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * Creates a new `DataStoreRatingInitParam` object.
             * @method constructor
             * @since 1.4
             */
            constructor();
            /**
             * The initial value of the rating.
             * @property {Number} [initialValue=0]
             * @since 1.4
             */
            initialValue: number;
            /**
             * A binary flag defining the options of the rating.
             * @see nwf.nex.DataStoreRatingOption
             * @property {Number} [optionFlag=nwf.nex.DataStoreRatingOption.FLAG_NONE]
             * @since 1.4
             */
            optionFlag: number;
            /**
             * The minimum acceptable ratings value.
             * @property {Number} [rangeMin=0]
             * @since 1.4
             */
            rangeMin: number;
            /**
             * The maximum acceptable ratings value.
             * @property {Number} [rangeMax=0]
             * @since 1.4
             */
            rangeMax: number;
            /**
             * Resets the lock so that the rating period is not restricted.
             * @since 1.4
             */
            resetLock(): void;
            /**
             * The rating locks for a period of seconds.
             * @param {Number} lockTimer How many seconds must pass before a user can rate this content again.
             * @since 1.4
             */
            setIntervalLock(lockTimer: any): void;
            /**
             * The rating locks until a certain day based on UTC.
             * @param {nwf.nex.DataStoreRatingLockPeriod} lockPeriod The day the rating will unlock on.
             * @param {Number} [lockOffset=0] The number of hour offset from 12:00 AM on the day of unlock. Example: -1 unlocks at 11:00 PM the night before, 1 unlocks at 1:00 AM. If not provided, this defaults to 12:00 AM.
             * @since 1.4
             */
            setPeriodicLock(lockPeriod?: number, lockOffset?: number): void;
            /**
             * The rating locks for a number of days and hours.
             * @param {Number} lockDays The days the rating will be locked for.
             * @param {Number} [lockHours=0] The hours the rating will be locked for.
             * @since 1.4
             */
            setDaysAfterLock(lockDays: number, lockHours?: number): void;
            /**
             * The rating lock is permanent and the content cannot be re-rated.
             * @since 1.4
             */
            setPermanentLock(): void;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreRatingLog {
            /**
             * Class defining the parameters of a Data Store Rating log.
             *
             * @class nwf.nex.DataStoreRatingLog
             * @author Ryan Lynd
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * Returns `true` if the data has been rated and `false` if not.
             * @property {Boolean} [isRated=false]
             * @readonly
             * @since 1.7
             */
            isRated: boolean;
            /**
             * A Date object set to the date that the rating lock period will expire.
             * @property {Date} [lockExpirationTime=new Date]
             * @readonly
             * @since 1.7
             */
            lockExpirationTime: any;
            /**
             * The current rating of the data.
             * @property {Number} [ratingValue=0]
             * @readonly
             * @since 1.7
             */
            ratingValue: number;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreSearchParam {
            /**
             * Class defining the parameters of a Data Store search.
             *
             * @class nwf.nex.DataStoreSearchParam
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
             * Creates a new DataStoreSearchParam object.
             * @method constructor
             * @since 1.4
             */
            constructor();
            /**
             * The type of search to perform.
             * @property {Number} [searchType=nwf.nex.DataStoreSearchType.SEARCH_TYPE_PUBLIC]
             * @since 1.4
             * @see nwf.nex.DataStoreSearchType.SEARCH_TYPE_PUBLIC
             */
            searchType: number;
            /**
             * The {@link nwf.act.NintendoAccount#principalID principalIDs} to use in searching for people who uploaded data.
             * @property {Array} [ownerIDs=[]]
             * @since 1.4
             */
            ownerIDs: any[];
            /**
             * The {@link nwf.nex.DataStoreOwnerType} to use in searching for people who uploaded data.
             * @property {Number} [ownerType=nwf.nex.DataStoreOwnerType.ANYBODY]
             * @since 1.4
             * @see nwf.nex.DataStoreOwnerType.ANYBODY
             */
            ownerType: number;
            /**
             * The {@link nwf.act.NintendoAccount#principalID principalIDs} of the access rights owners to search for.
             * @property {Array} [destinationIDs=[]]
             * @since 1.4
             */
            destinationIDs: any[];
            /**
             * The type of the data to search for. This value is set when a `{@link nwf.nex.DataStoreUploadObject#dataType DataStoreUploadObject}` is created.
             *
             * __Note:__ If the nwf.nex.DataStoreSearchParam#sortColumn parameter is changed or the nwf.nex.DataStoreSearchParam#tags parameter is set, this property must be changed from the default value of nwf.nex.DataStoreSearchParam#ALL_DATA_TYPES or an error will occur when searching.
             * @property {Number} [dataType=nwf.nex.DataStoreSearchParam.ALL_DATA_TYPES]
             * @since 1.4
             * @see nwf.nex.DataStoreSearchParam.ALL_DATA_TYPES
             */
            dataType: number;
            /**
            * An array of strings that can mark the data.
            *
            * __Note:__ If this parameter is set, the nwf.nex.DataStoreSearchParam#dataType property must be changed from the default value of nwf.nex.DataStoreSearchParam#ALL_DATA_TYPES or an error will occur when searching.
            * @property {Array} [tags=['']]
            * @since 1.4
            */
            tags: string[];
            /**
             * The column to sort the search results by.
             *
             * __Note:__ If this parameter is changed, the nwf.nex.DataStoreSearchParam#dataType property must be changed from the default value of nwf.nex.DataStoreSearchParam#ALL_DATA_TYPES or an error will occur when searching.
             * @property {Number} [sortColumn=nwf.nex.DataStoreSearchSortColumn.DATAID]
             * @since 1.4
             * @see nwf.nex.DataStoreSearchSortColumn.DATAID
             */
            sortColumn: number;
            /**
             * The order to sort the search results by. Set this to `1` to reverse the search result order.
             * @property {Number} [sortOrder=0]
             * @since 1.4
             */
            sortOrder: number;
            /**
             * Defines the maximum number of search results. The maximum size allowed is 100.
             * @property {Number} [resultSize=20]
             * @since 1.4
             */
            resultSize: number;
            /**
             * Defines the offset from the 0 index of the results where the search will start.
             * @property {Number} [resultOffset=0]
             * @since 1.4
             */
            resultOffset: number;
            /**
             * A binary flag defining the options of the search results. More complex options will take longer to retrieve.
             * @property {Number} [resultOption=nwf.nex.DataStoreResultOption.GET_NONE]
             * @since 1.4
             * @see nwf.nex.DataStoreResultOption.GET_NONE
             */
            resultOption: number;
            /**
             * The start creation date on which to search. It Should be less than `#createdBefore` or there may be an error.
             * If left to default, it will be ignored.
             * @property {Date} [createdAfter=new Date]
             * @since 1.4
             */
            createdAfter: Date;
            /**
             * The end creation date on which to search. It should be greater than `#createdAfter` or there may be an error.
             * If left to default, it will be ignored.
             * @property {Date} [createdBefore=new Date]
             * @since 1.4
             */
            createdBefore: Date;
            /**
             * The start update date on which to search. It should be less than `#updatedBefore` or there may be an error.
             * If left to default, it will be ignored.
             * @property {Date} [updatedAfter=new Date]
             * @since 1.4
             */
            updatedAfter: Date;
            /**
             * The end update date on which to search. It should be greater than `#updatedAfter` or there may be an error.
             * If left to default, it will be ignored.
             * @property {Date} [updatedBefore=new Date]
             * @since 1.4
             */
            updatedBefore: Date;
            /**
             * Resets the DataStoreSearchParam object to default values.
             * @since 1.4
             */
            reset(): void;
            /**
             * If `#resultOffset` is set to this, a random selection of search results will be returned.
             * @property {Number} [GET_RANDOM_SELECTION=0xFFFFFFFF]
             * @static @constant
             * @since 1.4
             */
            static GET_RANDOM_SELECTION: number;
            /**
            * If `#dataType` is set to this, the `#dataType` condition will be removed from the search conditions.
            * @property {uint16} [ALL_DATA_TYPES=0xFFFF]
            * @static @constant
            * @since 1.4
            */
            static ALL_DATA_TYPES: number;
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreSearchResult {
            /**
             * Class containing the structure of a downloaded Data Store search result.
             *
             * @class nwf.nex.DataStoreSearchResult
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * The ID of the data from the server.
             * @property {String} [dataID='']
             * @readonly
             * @since 1.4
             */
            dataID: string;
            /**
             * The principal ID of the person who uploaded the data.
             * @property {Number} [ownerID=0]
             * @readonly
             * @since 1.4
             */
            ownerID: number;
            /**
             * The type of the data. This value is set when a `{@link nwf.nex.DataStoreUploadObject#dataType DataStoreUploadObject}` is created.
             * @property {Number} [dataType=0x0000]
             * @readonly
             * @since 1.4
             */
            dataType: number;
            /**
            * The title of the data.
            * @property {String} [name='']
            * @readonly
            * @since 1.4
            */
            name: string;
            /**
            * The number of remaining valid days.
            * @property {Number} [period=0]
            * @readonly
            * @since 1.4
            */
            period: number;
            /**
            * An array of strings that can index the data for searches.
            * @property {Array} [tags=['']]
            * @readonly
            * @since 1.4
            */
            tags: string[];
            /**
            * Returns `true` when this object is valid, or `false` if it is not valid.
            * @property {Boolean} [isValid=true]
            * @readonly
            * @since 1.4
            */
            isValid: boolean;
            /**
            * The permission status controlling what users can access this data.
            * @property {Number} [accessPermissionStatus=0]
            * @readonly
            * @since 1.4
            */
            accessPermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to access this data. If `#accessPermissionStatus` is not `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND` then this is an empty array.
            * @property {Array} [accessPermissionRecipientIDs=[]]
            * @readonly
            * @since 1.4
            */
            accessPermissionRecipientIDs: any[];
            /**
            * The permission status controlling what users can update/delete this data.
            * @property {Number} [updatePermissionStatus=0]
            * @readonly
            * @since 1.4
            */
            updatePermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to update/delete this data. If `#updatePermissionStatus` is not `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND` then this is an empty array.
            * @property {Array} [updatePermissionRecipientIDs=[]]
            * @readonly
            * @since 1.4
            */
            updatePermissionRecipientIDs: any[];
            /**
            * The date on which the data was created.
            * @property {Date} [createdTime=new Date]
            * @readonly
            * @since 1.4
            */
            createdTime: Date;
            /**
            * The date on which the data was last updated.
            * @property {Date} [updatedTime=new Date]
            * @readonly
            * @since 1.4
            */
            updatedTime: Date;
            /**
            * The date on which the data will expire.
            * @property {Date} [expireTime=new Date]
            * @readonly
            * @since 1.4
            */
            expireTime: Date;
            /**
            * The approval status of the uploaded object.
            * @property {nwf.nex.DataStoreObjectStatus} [status=nwf.nex.DataStoreObjectStatus.STATUS_NORMAL;]
            * @readonly
            * @since 1.4
            */
            status: number;
            /**
            * How many times this data has been downloaded.
            * @property {Number} [downloadCount=0]
            * @readonly
            * @since 1.4
            * @removed 1.5 This property was removed in NEX version 3.5.1.
            */
            downloadCount: number;
            /**
            * An associated dataID.
            * @property {Number} [referDataID=0]
            * @readonly
            * @since 1.4
            */
            referDataID: number;
            /**
            * Flags set when the data was uploaded.
            * @property {nwf.nex.DataStoreDataFlag} [dataFlag=nwf.nex.DataStoreDataFlag.FLAG_NONE]
            * @readonly
            * @since 1.4
            */
            dataFlag: number;
            /**
             * A 1024-byte chunk of data that is attached to the meta info of a post.
             * @property {Blob} [metaBinary=new Blob]
             * @readonly
             * @since 1.4
             */
            metaBinary: Blob;
            /**
            * An array of nwf.nex.DataStoreRating objects representing the ratings in each of 16 potential slots. This will be `null` unless the `nwf.nex.DataStoreSearchParam` used for the search had its `{@link nwf.nex.DataStoreSearchParam#resultOption resultOption}` property set to `nwf.nex.DataStoreResultOption.GET_RATINGS`.
            * @property {null|Array} [ratings=null]
            * @readonly
            * @since 1.4
            */
            ratings: any[];
        }
    }
}
declare module nwf {
    module nex {
        class DataStoreUploadObject {
            /**
             * Class containing the structure of an uploadable Data Store post.
             *
             * @class nwf.nex.DataStoreUploadObject
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Creates a new DataStoreUploadObject object.
             * @method constructor
             * @since 1.2
             */
            constructor();
            /**
             * The binary data to upload. Maximum size is 10 megabytes.
             * @property {Blob} [data=new Blob]
             * @since 1.2
             */
            data: any;
            /**
             * The ID of the data from the server. This value is only set after the object has been successfully uploaded.
             * @property {String} [dataID='0']
             * @readonly
             * @since 1.2
             */
            dataID: string;
            /**
            * The title of the data.
            * @property {String} [name='']
            * @since 1.2
            */
            name: string;
            /**
             * The type of the data. This value can later be used to filter the data returned from an `nwf.nex.DataStore#dataSearch` search.
             * @property {Number} [dataType=0x0000]
             * @since 1.2
             */
            dataType: number;
            /**
            * The number of days the data stays valid after upload.  This has a maximum value of 365 days.
            *
            * If the data needs to persist beyond that length of time, use the `#persistenceSlot` property.
            * @property {Number} [period=0]
            * @since 1.2
            */
            period: number;
            /**
            * An array of strings that can index the data for searches.  If any duplicate strings are present in the array, the data will fail to upload.
            * @property {Array} [tags=['']]
            * @since 1.2
            */
            tags: string[];
            /**
            * The permission status controlling what users can access this data.
            * @property {Number} [accessPermissionStatus=nwf.nex.DataStorePermission.PRIVATE]
            * @since 1.4
            */
            accessPermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to access this data. Only necessary if `#accessPermissionStatus` is `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND`.
            * @property {Array} [accessPermissionRecipientIDs=[]]
            * @since 1.4
            */
            accessPermissionRecipientIDs: any[];
            /**
            * The permission status controlling what users can update/delete this data.
            * @property {Number} [updatePermissionStatus=nwf.nex.DataStorePermission.PRIVATE]
            * @since 1.4
            */
            updatePermissionStatus: number;
            /**
            * An array of {@link nwf.act.NintendoAccount#principalID principalIDs} of users allowed to update/delete this data. Only necessary if `#updatePermissionStatus` is `nwf.nex.DataStorePermission.SPECIFIED` or `nwf.nex.DataStorePermission.SPECIFIED_FRIEND`.
            * @property {Array} [updatePermissionRecipientIDs=[]]
            * @since 1.4
            */
            updatePermissionRecipientIDs: any[];
            /**
             * A 1024-byte chunk of data that is attached to the meta info of a post.
             * @property {Blob} [metaBinary=new Blob]
             * @since 1.4
             */
            metaBinary: Blob;
            /**
            * An array of `nwf.nex.DataStoreRatingInitParam` objects in slot order. This must be set when this object is first uploaded, it will be ignored on updates.
            * @property {Array} [ratingInitParams=[]]
            * @since 1.4
            */
            ratingInitParams: any[];
            /**
             * The persistence slot to store the data in.  This prevents the data in the slot from expiring.
             * Valid slot values are 0-15. Values beyond that range are ignored and the data does not persist. The default value of -1 means the data does not persist.
             *
             * __Note:__ _The same `#dataID` cannot exist in multiple persistence slots. If this is attempted the relevent function will fail._
             * @property {Number} [persistenceSlot=0]
             * @since 1.5
             */
            persistenceSlot: number;
            /**
            * This flag specifies if the data already present in the slot specified by `#persistenceSlot` should be deleted after it is overwritten.
            * The persistent data slot on the server only stores the `#dataID` of the provided data, so if a slot is overwritten, the original data is still present on the server.
            * If this object is used as a parameter for `{@link nwf.nex.DataStore#updateData}` and the `#dataID` in the selected `#persistenceSlot` are the same as was previously set, this variable is ignored.
            * @property {Boolean} [deleteLastObject=true]
            * @since 1.5
            */
            deleteLastObject: boolean;
            /**
             * If `true` then the data will be flaged as suspended and will only persist on the server for three hours before it is deleted. Calling the `nwf.nex.DataStore` method
             * `{@link nwf.nex.DataStore#completeSuspendedData completeSuspendedData}` with the `#dataID` of this data will return the data's lifespan to the value set in the `#period` property.
             * @property {Boolean} [needsCompletion=false]
             * @see nwf.nex.DataStore.completeSuspendedData
             * @since 1.7
             */
            needsCompletion: boolean;
        }
    }
}
declare module nwf {
    module events {
        class DataStoreEvent extends Event {
            /**
             * Events dispatched by the `DataStore` class.
             *
             * @class nwf.events.DataStoreEvent
             * @see {@link nwf.nex.DataStore}
             * @extends nwf.events.Event
             * @author Aaron Ward
             * @author Shawn Gates
             */
            constructor();
            /**
             * The DataStoreDownloadedObject returned from the server after a successful query.
             * Only set when `nwf.events.DataStoreEvent.DOWNLOAD_DATA_SUCCESS` is dispatched.
             * @property {nwf.nex.DataStoreDownloadedObject} [data={}]
             * @readonly
             * @since 1.2
             */
            data: {};
            /**
             * The ID of the newly uploaded data to the server.
             * Only set when `nwf.events.DataStoreEvent.UPLOAD_DATA_SUCCESS` is dispatched.
             * @property {String} [dataID="0"]
             * @readonly
             * @since 1.2
             */
            dataID: string;
            /**
             * The array of {@link nwf.nex.DataStoreSearchResult DataStoreSearchResult(s)} returned from the server after a successful search.
             * Only set when `nwf.events.DataStoreEvent.SEARCH_SUCCESS` is dispatched.
             * A successful search may return 0 {@link nwf.nex.DataStoreSearchResult DataStoreSearchResult(s)}.
             * @property {Array} [results=[]]
             * @readonly
             * @since 1.4
             */
            results: any[];
            /**
             * The updated rating returned from the server after a successful call to `nwf.nex.DataStore.rateData`.
             * Only set when `nwf.events.DataStoreEvent.RATE_DATA_SUCCESS` is dispatched.
             * @property {nwf.nex.DataStoreRating} [rating={}]
             * @readonly
             * @since 1.4
             */
            rating: {};
            /**
             * The array of {@link nwf.nex.DataStoreDownloadedObject DataStoreDownloadedObject(s)} returned from the server after a successful query.
             * The posts returned will not have their data properties set as this operation is only a shallow download of the basic metadata.
             * Only set when `nwf.events.DataStoreEvent.DOWNLOAD_BATCH_DATA_SUCCESS` is dispatched.
             * A successful search may return 0 {@link nwf.nex.DataStoreDownloadedObject DataStoreDownloadedObject(s)}.
             * @property {Array} [batchResults=[]]
             * @readonly
             * @since 1.4.5
             */
            batchResults: any[];
            /**
             * Error code that is set on a fail event. Helps tie the failed event to a `{@link nwf.events.SystemErrorEvent}`.
             *
             * @property {uint32} [errorCode=null]
             * @readonly
             * @since 1.7
             * @see nwf.system.SystemErrorCode
             */
            errorCode: any;
            /**
             * The rating log of the requested rating slot.
             * Only set when `nwf.events.DataStoreEvent.DOWNLOAD_RATING_LOG_SUCCESS` is dispatched.
             *
             * @property {nwf.nex.DataStoreRatingLog} [ratingLog=null]
             * @readonly
             * @since 1.7
             * @see nwf.nex.DataStoreRatingLog
             */
            ratingLog: any;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.downloadData` class is successful.
             * @property {String} [DOWNLOAD_DATA_SUCCESS='dataStoreDownloadDataSuccess']
             * @static @constant
             * @since 1.2
             */
            static DOWNLOAD_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.downloadData` class fails.
             * @property {String} [DOWNLOAD_DATA_FAILED='dataStoreDownloadDataFailed']
             * @static @constant
             * @since 1.2
            */
            static DOWNLOAD_DATA_FAILED: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.initialize` class is successful.
             * @property {String} [INITIALIZATION_SUCCESS='dataStoreInitializationSuccess']
             * @static @constant
             * @removed 1.4
             * @since 1.2
             */
            static INITIALIZATION_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.initialize` class fails.
             * @property {String} [INITIALIZATION_FAILED='dataStoreInitializationFailed']
             * @static @constant
             * @since 1.2
             * @removed 1.4
             */
            static INITIALIZATION_FAILED: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.uploadData` class is successful.
             * @property {String} [UPLOAD_DATA_SUCCESS='dataStoreUploadDataSuccess']
             * @static @constant
             * @since 1.2
             */
            static UPLOAD_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.uploadData` class fails.
             * @property {String} [UPLOAD_DATA_FAILED='dataStoreUploadDataFailed']
             * @static @constant
             * @since 1.2
             */
            static UPLOAD_DATA_FAILED: string;
            /**
             * Dispatched when the connection to the Game Server is severed for any reason (besides logging out).
             * @property {String} [DISCONNECTED='dataStoreDisconnected']
             * @static @constant
             * @since 1.3
             * @removed 1.4 Use nwf.events.GameServerEvent.DISCONNECTED instead
             */
            static DISCONNECTED: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.dataSearch` is successful.  A successful search may return 0 objects.
             * @property {String} [SEARCH_SUCCESS='dataStoreSearchSuccess']
             * @static @constant
             * @since 1.4
             */
            static SEARCH_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.dataSearch` fails.
             * @property {String} [SEARCH_FAILED='dataStoreSearchFailed']
             * @static @constant
             * @since 1.4
             */
            static SEARCH_FAILED: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.deleteData` is successful.
             * @property {String} [DELETE_DATA_SUCCESS='dataStoreDeleteDataSuccess']
             * @static @constant
             * @since 1.4
             */
            static DELETE_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.deleteData` fails.
             * @property {String} [DELETE_DATA_FAILED='dataStoreDeleteDataFailed']
             * @static @constant
             * @since 1.4
             */
            static DELETE_DATA_FAILED: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.updateData` is successful.
             * @property {String} [UPDATE_DATA_SUCCESS='dataStoreUpdateDataSuccess']
             * @static @constant
             * @since 1.4
             */
            static UPDATE_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.updateData` fails.
             * @property {String} [UPDATE_DATA_FAILED='dataStoreUpdateDataFailed']
             * @static @constant
             * @since 1.4
             */
            static UPDATE_DATA_FAILED: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.rateData` is successful.
             * @property {String} [RATE_DATA_SUCCESS='dataStoreRateDataSuccess']
             * @static @constant
             * @since 1.4
             */
            static RATE_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to `nwf.nex.DataStore.rateData` fails.
             * @property {String} [RATE_DATA_FAILED='dataStoreRateDataFailed']
             * @static @constant
             * @since 1.4
             */
            static RATE_DATA_FAILED: string;
            /**
              * Dispatched when a call made to the `nwf.nex.DataStore.login` class is successful.
              * @property {String} [LOGIN_SUCCESS='dataStoreLoginSuccess']
              * @static @constant
              * @since 1.3
              * @removed 1.4 Use nwf.events.GameServerEvent.LOGIN_SUCCESS instead.
              */
            static LOGIN_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.login` class fails.
             * @property {String} [LOGIN_FAILED='dataStoreLoginFailed']
             * @static @constant
             * @since 1.3
             * @removed 1.4 Use nwf.events.GameServerEvent.LOGIN_SUCCESS instead.
             */
            static LOGIN_FAILED: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.logout` class is successful.
             * @property {String} [LOGOUT_SUCCESS='dataStoreLogoutSuccess']
             * @static @constant
             * @since 1.3
             * @removed 1.4
             */
            static LOGOUT_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.logout` class fails.
             * @property {String} [LOGOUT_FAILED='dataStoreLogoutFailed']
             * @static @constant
             * @since 1.3
             * @removed 1.4
             */
            static LOGOUT_FAILED: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.downloadBatchData` function is successful.
             * @property {String} [DOWNLOAD_BATCH_DATA_SUCCESS='dataStoreDownloadBatchDataSuccess']
             * @static @constant
             * @since 1.4.5
             */
            static DOWNLOAD_BATCH_DATA_SUCCESS: string;
            /**
             * Dispatched when a call made to the `nwf.nex.DataStore.downloadBatchData` function fails.
             * @property {String} [DOWNLOAD_BATCH_DATA_FAILED='dataStoreDownloadBatchDataFailed']
             * @static @constant
             * @since 1.4.5
             */
            static DOWNLOAD_BATCH_DATA_FAILED: string;
            /**
             * Dispatched when a call made to the `{@link nwf.nex.DataStore#completeSuspendedData nwf.nex.DataStore.completeSuspendedData}` function is successful.
             * @property {String} [COMPLETE_SUSPENDED_OBJECT_SUCCESS='dataStoreCompleteSuspendedObjectSuccess']
             * @static @constant
             * @since 1.7
             */
            static COMPLETE_SUSPENDED_OBJECT_SUCCESS: string;
            /**
             * Dispatched when a call made to the `{@link nwf.nex.DataStore#completeSuspendedData nwf.nex.DataStore.completeSuspendedData}` function fails.
             * @property {String} [COMPLETE_SUSPENDED_OBJECT_FAILED='dataStoreCompleteSuspendedObjectFailed']
             * @static @constant
             * @since 1.7
             */
            static COMPLETE_SUSPENDED_OBJECT_FAILED: string;
            /**
             * Dispatched when a call made to the `{@link nwf.nex.DataStore#downloadRatingLog nwf.nex.DataStore.downloadRatingLog}` function is successful.
             * @property {String} [DOWNLOAD_RATING_LOG_SUCCESS='dataStoreDownloadRatingLogSuccess']
             * @static @constant
             * @since 1.7
             * @see nwf.events.DataStoreEvent.ratingLog
             */
            static DOWNLOAD_RATING_LOG_SUCCESS: string;
            /**
             * Dispatched when a call made to the `{@link nwf.nex.DataStore#downloadRatingLog nwf.nex.DataStore.downloadRatingLog}` function fails.
             * @property {String} [DOWNLOAD_RATING_LOG_FAILED='dataStoreDownloadRatingLogFailed']
             * @static @constant
             * @since 1.7
             * @see nwf.events.DataStoreEvent.errorCode
             */
            static DOWNLOAD_RATING_LOG_FAILED: string;
        }
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreDataFlag constants.
         *
         * @enum nwf.nex.DataStoreDataFlag
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreDataFlag: {
            FLAG_NONE: number;
            FLAG_NEED_REVIEW: number;
            FLAG_PERIOD_FROM_LAST_REFERRED: number;
            FLAG_USE_NOTIFICATION_ON_POST: number;
            FLAG_NOT_USE_FILESERVER: number;
            FLAG_NEED_COMPLETION: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreMetaCompareFlag constants.
         *
         * @enum nwf.nex.DataStoreMetaCompareFlag
         * @author Shawn Gates
         */
        var DataStoreMetaCompareFlag: {
            COMPARISON_FLAG_NONE: number;
            COMPARISON_FLAG_NAME: number;
            COMPARISON_FLAG_ACCESS_PERMISSION: number;
            COMPARISON_FLAG_UPDATE_PERMISSION: number;
            COMPARISON_FLAG_PERIOD: number;
            COMPARISON_FLAG_METABINARY: number;
            COMPARISON_FLAG_TAGS: number;
            COMPARISON_FLAG_DATA_TYPE: number;
            COMPARISON_FLAG_STATUS: number;
            COMPARISON_FLAG_ALL: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreObjectStatus constants.
         *
         * @enum nwf.nex.DataStoreObjectStatus
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreObjectStatus: {
            STATUS_NORMAL: number;
            STATUS_PENDING: number;
            STATUS_REJECTED: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreOwnerType constants.
         *
         * @enum nwf.nex.DataStoreOwnerType
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreOwnerType: {
            ANYBODY: number;
            FRIENDS: number;
            EXCLUDE_SPECIFIED_IDS: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStorePermission constants.
         *
         * @enum nwf.nex.DataStorePermission
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStorePermission: {
            PUBLIC: number;
            FRIEND: number;
            SPECIFIED: number;
            PRIVATE: number;
            SPECIFIED_FRIEND: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreRatingLockPeriod constants.
         *
         * @enum nwf.nex.DataStoreRatingLockPeriod
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreRatingLockPeriod: {
            RATING_LOCK_PERIOD_MON: number;
            RATING_LOCK_PERIOD_TUE: number;
            RATING_LOCK_PERIOD_WED: number;
            RATING_LOCK_PERIOD_THU: number;
            RATING_LOCK_PERIOD_FRI: number;
            RATING_LOCK_PERIOD_SAT: number;
            RATING_LOCK_PERIOD_SUN: number;
            RATING_LOCK_PERIOD_DAY_ONE: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreRatingOption constants.
         *
         * @enum nwf.nex.DataStoreRatingOption
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreRatingOption: {
            FLAG_NONE: number;
            FLAG_MODIFIABLE: number;
            FLAG_ROUND_ZERO: number;
            FLAG_DISABLE_SELF_RATING: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreOwnerType constants.
         *
         * @enum nwf.nex.DataStoreResultOption
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreResultOption: {
            GET_NONE: number;
            GET_TAGS: number;
            GET_RATINGS: number;
            GET_METABINARY: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreSearchType constants.
         *
         * @enum nwf.nex.DataStoreSearchType
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreSearchType: {
            SEARCH_TYPE_PUBLIC: number;
            SEARCH_TYPE_SEND_FRIEND: number;
            SEARCH_TYPE_SEND_SPECIFIED: number;
            SEARCH_TYPE_SEND_SPECIFIED_FRIEND: number;
            SEARCH_TYPE_SEND: number;
            SEARCH_TYPE_FRIEND: number;
            SEARCH_TYPE_RECEIVED_SPECIFIED: number;
            SEARCH_TYPE_RECEIVED: number;
            SEARCH_TYPE_PRIVATE: number;
            SEARCH_TYPE_OWN: number;
            SEARCH_TYPE_PUBLIC_EXCLUDE_FRIEND: number;
            SEARCH_TYPE_OWN_PENDING: number;
            SEARCH_TYPE_OWN_REJECTED: number;
            SEARCH_TYPE_OWN_ALL: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * DataStoreSearchSortColumn constants.
         *
         * @enum nwf.nex.DataStoreSearchSortColumn
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var DataStoreSearchSortColumn: {
            DATAID: number;
            SIZE: number;
            NAME: number;
            DATA_TYPE: number;
            CREATED_TIME: number;
            UPDATED_TIME: number;
            RATING_SLOT_0: number;
            RATING_SLOT_1: number;
            RATING_SLOT_2: number;
            RATING_SLOT_3: number;
            RATING_SLOT_4: number;
            RATING_SLOT_5: number;
            RATING_SLOT_6: number;
            RATING_SLOT_7: number;
            RATING_SLOT_8: number;
            RATING_SLOT_9: number;
            RATING_SLOT_10: number;
            RATING_SLOT_11: number;
            RATING_SLOT_12: number;
            RATING_SLOT_13: number;
            RATING_SLOT_14: number;
            RATING_SLOT_15: number;
            AVG_RATING_SLOT_0: number;
            AVG_RATING_SLOT_1: number;
            AVG_RATING_SLOT_2: number;
            AVG_RATING_SLOT_3: number;
            AVG_RATING_SLOT_4: number;
            AVG_RATING_SLOT_5: number;
            AVG_RATING_SLOT_6: number;
            AVG_RATING_SLOT_7: number;
            AVG_RATING_SLOT_8: number;
            AVG_RATING_SLOT_9: number;
            AVG_RATING_SLOT_10: number;
            AVG_RATING_SLOT_11: number;
            AVG_RATING_SLOT_12: number;
            AVG_RATING_SLOT_13: number;
            AVG_RATING_SLOT_14: number;
            AVG_RATING_SLOT_15: number;
        };
    }
}
declare module nwf {
    module nex {
        class DataStore extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the NEX Data Stores.
             *
             * Class purpose - Work with NEX Data Store data
             *
             * **CAUTION:** Please be aware that anything you post to the generic Data Store when using the included Running Client application will be visible to **all** Nintendo Web Framework developers.
             *
             * <div style="color:#aa0000; font-weight:bold;">
             * Do not post any confidential information, including information owned by Nintendo or information related to your own application in development.
             * </div><br />
             *
             * The `DataStore` class dispatches the following events:
             *
             * - nwf.events.DataStoreEvent.DELETE_DATA_FAILED
             * - nwf.events.DataStoreEvent.DELETE_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.DOWNLOAD_DATA_FAILED
             * - nwf.events.DataStoreEvent.DOWNLOAD_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.UPLOAD_DATA_FAILED
             * - nwf.events.DataStoreEvent.UPLOAD_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.UPDATE_DATA_FAILED
             * - nwf.events.DataStoreEvent.UPDATE_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.RATE_DATA_FAILED
             * - nwf.events.DataStoreEvent.RATE_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.SEARCH_FAILED
             * - nwf.events.DataStoreEvent.SEARCH_SUCCESS
             * - nwf.events.DataStoreEvent.DOWNLOAD_BATCH_DATA_FAILED
             * - nwf.events.DataStoreEvent.DOWNLOAD_BATCH_DATA_SUCCESS
             * - nwf.events.DataStoreEvent.COMPLETE_SUSPENDED_OBJECT_FAILED
             * - nwf.events.DataStoreEvent.COMPLETE_SUSPENDED_OBJECT_SUCCESS
             * - nwf.events.DataStoreEvent.DOWNLOAD_RATING_LOG_SUCCESS
             * - nwf.events.DataStoreEvent.DOWNLOAD_RATING_LOG_FAILED
             *
             * @class nwf.nex.DataStore
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
            * @private
            * The `new` method is not used to get an instance of a `DataStore` object; use #getInstance instead.
            * @method constructor
            * @since 1.0
            */
            constructor();
            /**
              * Returns `true` if the library has been initialized, or `false` otherwise.
              * @property {Boolean} [isReady=false]
              * @since 1.2
              * @readonly
              * @removed 1.4
              */
            isReady: boolean;
            /**
             * Returns `true` if the library is ready to begin communicating with the server, or `false` if it is not.
             * @property {Boolean} [isLoggedIn=false]
             * @since 1.3
             * @readonly
             * @removed 1.4
             */
            isLoggedIn: boolean;
            /**
             * Returns `true` if the Data Store interface is bound to the NEX Game Server, or `false` if it is not.
             * @property {Boolean} [isBound=false]
             * @since 1.4
             * @readonly
             */
            isBound: boolean;
            /**
             * Queries the server and returns a DataStore post.
             *
             * @param {String} dataID The ID of the data to be retrieved.
             * @param {Boolean} [getTags=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#tags tags} attached. When set to `false`, it does not.
             * @param {Boolean} [getMetaBinary=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#metaBinary metaBinary} attached. When set to `false`, it does not.
             * @param {Boolean} [getRecipientIds=false] When set to `true`, the returned post has its recipient IDs attached. When set to `false`, it does not.
             *
             * __See Related:__
             *
             * {@link nwf.nex.DataStoreDownloadedObject#accessPermissionRecipientIDs}
             *
             * {@link nwf.nex.DataStoreDownloadedObject#updatePermissionRecipientIDs}.
             * @param {Boolean} [getRatings=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#ratings rating} info attached. When set to `false`, it does not.
             * @returns {uint32} Result code.
             * @since 1.2
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_FAILED
             * @async
             */
            downloadData(dataID: string, getTags?: boolean, getMetaBinary?: boolean, getRecipientIds?: boolean, getRatings?: boolean): number;
            /**
             * Queries the server and returns a DataStore post that is stored in a specific user's persistent data.
             *
             * @param {Number} principalID The `{@link nwf.act.NintendoAccount#principalID principalID}` of the user who uploaded the data.
             * @param {Number} slotID The `{@link nwf.nex.DataStoreUploadObject#persistenceSlot persistenceSlot}` to be retrieved.
             * @param {Boolean} [getTags=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#tags tags} attached. When set to `false`, it does not.
             * @param {Boolean} [getMetaBinary=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#metaBinary metaBinary} attached. When set to `false`, it does not.
             * @param {Boolean} [getRecipientIds=false] When set to `true`, the returned post has its recipient IDs attached. When set to `false`, it does not.
             *
             * __See Related:__
             *
             * {@link nwf.nex.DataStoreDownloadedObject#accessPermissionRecipientIDs}
             *
             * {@link nwf.nex.DataStoreDownloadedObject#updatePermissionRecipientIDs}.
             * @param {Boolean} [getRatings=false] When set to `true`, the returned post has its {@link nwf.nex.DataStoreDownloadedObject#ratings rating} info attached. When set to `false`, it does not.
             * @returns {uint32} Result code.
             * @since 1.5
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_FAILED
             * @async
             */
            downloadPersistentData(principalID: number, slotID: number, getTags?: boolean, getMetaBinary?: boolean, getRecipientIds?: boolean, getRatings?: boolean): number;
            /**
            * Initializes the DataStore library.
            * This must be called before other functions are called.
            * The DataStore library can only be initialized once while the application is running.
            * @returns {null}
            * @since 1.2
            * @see nwf.events.DataStoreEvent.INITIALIZATION_SUCCESS
            * @see nwf.events.DataStoreEvent.INITIALIZATION_FAILED
            * @removed 1.4
            */
            initialize(): void;
            /**
             * Logs into the Game Server and connects to the Data Store
             * @returns {null}
             * @since 1.3
             * @see nwf.events.DataStoreEvent.LOGIN_SUCCESS
             * @see nwf.events.DataStoreEvent.LOGIN_FAILED
             * @removed 1.4
             */
            login(): void;
            /**
             * Logs out of the Game Server and disconnects from the Data Store
             * @returns {null}
             * @since 1.3
             * @see nwf.events.DataStoreEvent.LOGOUT_SUCCESS
             * @see nwf.events.DataStoreEvent.LOGOUT_FAILED
             * @removed 1.4
             */
            logout(): void;
            /**
             * Posts data to the server. Calling this function triggers communication.
             * @param {nwf.nex.DataStoreUploadObject} post The data to send to the server.
             * @returns {uint32} Result code.
             * @since 1.2
             * @see nwf.events.DataStoreEvent.UPLOAD_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.UPLOAD_DATA_FAILED
             * @async
             */
            uploadData(post: any): number;
            /**
             * Creates and binds the Data Store interface to the NEX Game Server. This must be called before other Data Store methods. Must be logged into the Game Server before this will succeed.
             * @returns {Boolean} Returns `true` if the bind succeeded, or `false` otherwise.
             * @see nwf.nex.GameServer.login
             * @since 1.4
             */
            bind(): boolean;
            /**
             * Searches the server for matching data.
             * @param {nwf.nex.DataStoreSearchParam} searchParam The type of search to perform.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.DataStoreEvent.SEARCH_SUCCESS
             * @see nwf.events.DataStoreEvent.SEARCH_FAILED
             * @async
             */
            dataSearch(searchParam: any): number;
            /**
             * Deletes a post from the server. Only users with update permissions can delete posts.
             * If this function is used to delete data that has been made persistent, that persistence slot will also be cleared.
             *
             * @param {String} dataID The ID of the data to be deleted.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.DataStoreEvent.DELETE_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.DELETE_DATA_FAILED
             * @async
             */
            deleteData(dataID: string): number;
            /**
             * Queries the server using a nwf.nex.DataStoreSearchResult and returns a DataStore post.
             *
             * @param {nwf.nex.DataStoreSearchResult} searchResult The search result indicating the data to be retrieved.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.DOWNLOAD_DATA_FAILED
             * @async
             */
            downloadDataByResult(searchResult: any): number;
            /**
             * Updates data on the server. Calling this function triggers communication.
             * @param {String} dataID The ID of the data to be updated.
             * @param {nwf.nex.DataStoreUploadObject} post The data to send to the server. If the data property is not set, only the meta info is updated.
             *
             * __Note:__ _If the data property was not set when the object was initially posted, data cannot be updated later. This dispatches a `nwf.system.SystemErrorCode.NEX_DATA_STORE_OPERATION_NOT_ALLOWED` error._
             * @param {nwf.nex.DataStoreMetaCompareParam} [metaCompare] If this property is set, the update will only occur if the specified properties match the metadata of the data on the server. See `nwf.nex.DataStoreMetaCompareParam` for more information.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.DataStoreEvent.UPDATE_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.UPDATE_DATA_FAILED
             * @async
             */
            updateData(dataID: string, post: any, metaCompare?: any): number;
            /**
             * Rates an object from the server.
             *
             * @param {String} dataID The ID of the data to be rated.
             * @param {uint32} slotId The ratings slot to be modified.
             * @param {uint32} ratingValue The value to add to the rating.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.DataStoreEvent.RATE_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.RATE_DATA_FAILED
             * @async
             */
            rateData(dataID: string, slotId: number, ratingValue: number): number;
            /**
             * Queries the server and returns a collection of DataStore posts.
             * The posts returned do not have their data properties set, as this operation is only a shallow download of the basic metadata.
             *
             * @param {Array} dataIDs The IDs of the data to be retrieved.
             * @param {Boolean} [getTags=false] When set to `true`, the returned posts have their tags attached. When set to `false`, they do not.
             * @param {Boolean} [getMetaBinary=false] When set to `true`, the returned posts have their {@link nwf.nex.DataStoreDownloadedObject#metaBinary metaBinary} attached. When set to `false`, they do not.
             * @param {Boolean} [getRecipientIds=false] When set to `true`, the returned posts have their recipient IDs attached. When set to `false`, they do not. See {@link nwf.nex.DataStoreDownloadedObject#accessPermissionRecipientIDs} and {@link nwf.nex.DataStoreDownloadedObject#updatePermissionRecipientIDs}.
             * @param {Boolean} [getRatings=false] When set to `true`, the returned posts have their {@link nwf.nex.DataStoreDownloadedObject#ratings rating} info attached. When set to `false`, they do not.
             * @returns {uint32} Result code.
             * @since 1.4.5
             * @see nwf.events.DataStoreEvent.DOWNLOAD_BATCH_DATA_SUCCESS
             * @see nwf.events.DataStoreEvent.DOWNLOAD_BATCH_DATA_FAILED
             * @async
             */
            downloadBatchData(dataID: any, getTags?: boolean, getMetaBinary?: boolean, getRecipientIds?: boolean, getRatings?: boolean): number;
            /**
             * Completes a collection of DataStore posts that are currently suspended.
             * If any `{@link nwf.nex.DataStoreUploadObject#dataID dataID}`s in the provided parameter are not suspended, the operation will fail and all the suspended `{@link nwf.nex.DataStoreUploadObject#dataID dataID}`s will remain suspended.
             *
             * @param {Array} dataIDs The IDs of the data to be published.
             * @returns {uint32} Result code.
             * @since 1.7
             * @see nwf.nex.DataStoreUploadObject.needsCompletion
             * @see nwf.events.DataStoreEvent.COMPLETE_SUSPENDED_OBJECT_SUCCESS
             * @see nwf.events.DataStoreEvent.COMPLETE_SUSPENDED_OBJECT_FAILED
             * @async
             */
            completeSuspendedData(dataIDs: any): number;
            /**
             * Retrieves a `{@link nwf.nex.DataStoreRatingLog RatingLog}` for the specified data and slot.
             *
             * Rating logs can only be downloaded for ratings that have the `{@link nwf.nex.DataStoreRatingOption#FLAG_MODIFIABLE FLAG_MODIFIABLE}` flag set on the RatingInitParam `{@link nwf.nex.DataStoreRatingInitParam#optionFlag optionFlag}`.
             *
             * @param {String} dataID The ID of the data to retrieve the rating log for.
             * @param {Number} slot The rating slot to retrieve the log for.
             * @returns {uint32} Result code.
             * @since 1.7
             * @see nwf.events.DataStoreEvent.DOWNLOAD_RATING_LOG_SUCCESS
             * @see nwf.events.DataStoreEvent.DOWNLOAD_RATING_LOG_FAILED
             * @async
             */
            downloadRatingLog(dataID: string, slot: number): number;
            /**
             * Accesses an instance of the `DataStore` singleton.
             *
             * @method getInstance
             * @returns {nwf.nex.DataStore} The `DataStore` singleton instance.
             * @since 1.2
             * @static
             */
            static getInstance(): DataStore;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @static
             * @since 1.2
             */
            static isSupported(): boolean;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    module nex {
        class RankData {
            /**
             * Class containing the structure of a downloaded Data Store post.
             *
             * @class nwf.nex.RankData
             * @author Shawn Gates
             */
            /**
             * The category of the `RankData`.
             * @property {Number} [category=0]
             * @readonly
             * @since 1.4
             */
            category: number;
            /**
             * The principalID associated with the `RankData`.
             * @property {Number} [prinicipalID=0]
             * @readonly
             * @since 1.4
             */
            prinicipalID: number;
            /**
             * The uniqueID associated with the `RankData`.
             * @property {Number} [uniqueID=0]
             * @readonly
             * @since 1.4
             */
            uniqueID: number;
            /**
             * The order of the `RankData`.
             * @property {Number} [order=0]
             * @readonly
             * @since 1.4
             */
            order: number;
            /**
             * The score of the `RankData`.
             * @property {Number} [score=0]
             * @readonly
             * @since 1.4
             */
            score: number;
            /**
             * The group0 of the `RankData`.
             * @property {Number} [group0=0]
             * @readonly
             * @since 1.4
             */
            group0: number;
            /**
             * The group1 of the `RankData`.
             * @property {Number} [group1=0]
             * @readonly
             * @since 1.4
             */
            group1: number;
            /**
             * The common data associated with the user.
             * @property {Blob} [commonData={}]
             * @readonly
             * @since 1.4
             */
            commonData: {};
            /**
             * The param of the RankData. It is a uint64 value represented as a hex string.
             * @property {String} [param='']
             * @readonly
             * @since 1.4
             */
            param: string;
        }
    }
}
declare module nwf {
    module nex {
        class RankingSearchParam {
            /**
             * Class defining the parameters of a Ranking Client search.
             *
             * @class nwf.nex.RankingSearchParam
             * @author Shawn Gates
             */
            /**
             * Creates a new RankingSearchParam object.
             * @method constructor
             * @since 1.4
             */
            constructor();
            /**
             * The category to perform the search on.
             * @property {uint32} [category=0]
             * @since 1.4
             */
            category: number;
            /**
             * The ranking group to search in. When set to the default value, no filtering by group will occur.
             * @property {uint32} [groupIndex=255]
             * @since 1.4
             */
            groupIndex: number;
            /**
             * The value of the ranking group specified by `#groupIndex` to filter on.
             * @property {uint32} [groupNum=0]
             * @since 1.4
             */
            groupNum: number;
            /**
             * The number of {@link nwf.nex.RankData RankData} objects to fetch.
             * @property {uint32} [length=20]
             * @since 1.4
             */
            length: number;
            /**
             * Specifies the offset from which to begin getting rankings.
             * @property {uint32} [offset=0]
             * @since 1.4
             */
            offset: number;
            /**
             * Specifies how rankings are ordered.
             * @property {uint32} [orderCalculation=nwf.nex.RankingOrderCalculation.CALC_113]
             * @since 1.4
             * @see nwf.nex.RankingOrderCalculation.CALC_113
             */
            orderCalculation: number;
            /**
             * The principalID to perform the search on.
             * @property {uint32} [principalID=0]
             * @since 1.4
             */
            principalID: number;
            /**
             * The type of ranking to return.
             * @property {uint32} [rankingMode=nwf.nex.RankingMode.RANGE]
             * @since 1.4
             * @see nwf.nex.RankingMode.RANGE
             */
            rankingMode: number;
            /**
             * Specifies the time scope to use when filtering by period.
             * @property {uint32} [timeScope=nwf.nex.RankingTimeScope.ALL]
             * @since 1.4
             * @see nwf.nex.RankingTimeScope.ALL
             */
            timeScope: number;
            /**
             * The uniqueID to perform the search on.
             * @property {String} [uniqueID='0']
             * @since 1.4
             */
            uniqueID: string;
        }
    }
}
declare module nwf {
    module events {
        class RankingClientEvent extends Event {
            /**
             * Events dispatched by the `RankingClient` class.
             *
             * @class nwf.events.RankingClientEvent
             * @see {@link nwf.nex.RankingClient}
             * @extends nwf.events.Event
             * @author Aaron Ward
             * @author Shawn Gates
             */
            constructor();
            /**
             * Blob data returned from the server after a successful query.
             *
             * Only set when `nwf.events.RankingClientEvent.DOWNLOAD_COMMON_DATA_SUCCESS` is dispatched.
             * @property {Blob} [commonData={}]
             * @readonly
             * @since 1.4
             */
            commonData: {};
            /**
             * The array of {@link nwf.nex.RankData RankData(s)} in rank order returned from the server after a successful search.
             *
             * Only set when `nwf.events.RankingClientEvent.DOWNLOAD_RANKING_LIST_SUCCESS` is dispatched.
             *
             * __Note:__ _A successful search may return 0 {@link nwf.nex.RankData RankData(s)}._
             * @property {Array} [ranks=[]]
             * @readonly
             * @since 1.4
             */
            ranks: any[];
            /**
             * Dispatched when a call made to the `nwf.nex.RankingClient.downloadCommonData` class is successful.
             * @property {String} [DOWNLOAD_COMMON_DATA_SUCCESS='rankingClientDownloadCommonDataSuccess']
             * @static @constant
             * @since 1.4
             */
            static DOWNLOAD_COMMON_DATA_SUCCESS: string;
            /**
           * Dispatched when a call made to the `nwf.nex.RankingClient.downloadCommonData` class fails.
           * @property {String} [DOWNLOAD_COMMON_DATA_FAILED='rankingClientDownloadCommonDataFailed']
           * @static @constant
           * @since 1.4
           */
            static DOWNLOAD_COMMON_DATA_FAILED: string;
            /**
            * Dispatched when a call made to the `nwf.nex.RankingClient.uploadCommonData` class is successful.
            * @property {String} [UPLOAD_COMMON_DATA_SUCCESS='rankingClientUploadCommonDataSuccess']
            * @static @constant
            * @since 1.4
            */
            static UPLOAD_COMMON_DATA_SUCCESS: string;
            /**
            * Dispatched when a call made to the `nwf.nex.RankingClient.uploadCommonData` class fails.
            * @property {String} [UPLOAD_COMMON_DATA_FAILED='rankingClientUploadCommonDataFailed']
            * @static @constant
            * @since 1.4
            */
            static UPLOAD_COMMON_DATA_FAILED: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.deleteCommonData` is successful.
            * @property {String} [DELETE_COMMON_DATA_SUCCESS='rankingClientDeleteCommonDataSuccess']
            * @static @constant
            * @since 1.4
            */
            static DELETE_COMMON_DATA_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.deleteCommonData` fails.
            * @property {String} [DELETE_COMMON_DATA_FAILED='rankingClientDeleteCommonDataFailed']
            * @static @constant
            * @since 1.4
            */
            static DELETE_COMMON_DATA_FAILED: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.deleteScore` is successful.
            * @property {String} [DELETE_SCORE_SUCCESS='rankingClientDeleteScoreSuccess']
            * @static @constant
            * @since 1.4
            */
            static DELETE_SCORE_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.deleteScore` fails.
            * @property {String} [DELETE_SCORE_FAILED='rankingClientDeleteScoreFailed']
            * @static @constant
            * @since 1.4
            */
            static DELETE_SCORE_FAILED: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.uploadScore` is successful.
            * @property {String} [UPLOAD_SCORE_SUCCESS='rankingClientUploadScoreSuccess']
            * @static @constant
            * @since 1.4
            */
            static UPLOAD_SCORE_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.uploadScore` fails.
            * @property {String} [UPLOAD_SCORE_FAILED='rankingClientUploadScoreFailed']
            * @static @constant
            * @since 1.4
            */
            static UPLOAD_SCORE_FAILED: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.downloadRankingList` is successful.
            * @property {String} [DOWNLOAD_RANKING_LIST_SUCCESS='dataStoreRateDataSuccess']
            * @static @constant
            * @since 1.4
            */
            static DOWNLOAD_RANKING_LIST_SUCCESS: string;
            /**
            * Dispatched when a call made to `nwf.nex.RankingClient.downloadRankingList` fails.
            * @property {String} [DOWNLOAD_RANKING_LIST_FAILED='dataStoreRateDataFailed']
            * @static @constant
            * @since 1.4
            */
            static DOWNLOAD_RANKING_LIST_FAILED: string;
        }
    }
}
declare module nwf {
    module nex {
        /**
         * RankingMode constants.
         *
         * @enum nwf.nex.RankingMode
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var RankingMode: {
            RANGE: number;
            NEAR: number;
            FRIEND_RANGE: number;
            FRIEND_NEAR: number;
            USER: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * RankingOrderCalculation constants.
         *
         * @enum nwf.nex.RankingOrderCalculation
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var RankingOrderCalculation: {
            CALC_113: number;
            CALC_123: number;
        };
    }
}
declare module nwf {
    module nex {
        /**
         * RankingTimeScope constants.
         *
         * @enum nwf.nex.RankingTimeScope
         * @author Aaron Ward
         * @author Shawn Gates
         */
        var RankingTimeScope: {
            CUSTOM_0: number;
            CUSTOM_1: number;
            ALL: number;
        };
    }
}
declare module nwf {
    module nex {
        class RankingClient extends nwf.events.EventDispatcher {
            /**
             * Class for interacting with the NEX Ranking Client.
             *
             * The `RankingClient` class dispatches the following events:
             *
             * - nwf.events.RankingClientEvent.DELETE_COMMON_DATA_SUCCESS
             * - nwf.events.RankingClientEvent.DELETE_COMMON_DATA_FAILED
             * - nwf.events.RankingClientEvent.DELETE_SCORE_SUCCESS
             * - nwf.events.RankingClientEvent.DELETE_SCORE_FAILED
             * - nwf.events.RankingClientEvent.DOWNLOAD_COMMON_DATA_SUCCESS
             * - nwf.events.RankingClientEvent.DOWNLOAD_COMMON_DATA_FAILED
             * - nwf.events.RankingClientEvent.DOWNLOAD_RANKING_LIST_SUCCESS
             * - nwf.events.RankingClientEvent.DOWNLOAD_RANKING_LIST_FAILED
             * - nwf.events.RankingClientEvent.UPLOAD_COMMON_DATA_SUCCESS
             * - nwf.events.RankingClientEvent.UPLOAD_COMMON_DATA_FAILED
             * - nwf.events.RankingClientEvent.UPLOAD_SCORE_SUCCESS
             * - nwf.events.RankingClientEvent.UPLOAD_SCORE_FAILED
             *
             * @class nwf.nex.RankingClient
             * @extends nwf.events.EventDispatcher
             * @singleton
             * @author Aaron Ward
             * @author Shawn Gates
             */
            /**
            * @private
            * The `new` method is not used to get an instance of a `RankingClient` object; use `#getInstance` instead.
            * @method constructor
            * @since 1.0
            */
            constructor();
            /**
              * Returns `true` if the Ranking Client interface is bound to the NEX Game Server, or `false` if it is not.
              * @property {Boolean} [isBound=false]
              * @since 1.4
              * @readonly
              */
            isBound: boolean;
            /**
             * Uploads a score to the Game Server.
             *
             * @param {Number} scoreValue The score value to be submitted.
             * @param {Number} [scoreCategory=0] The category to store the score under. Can be used for searching.
             * @param {Number} [scoreGroup0=0] The primary group to store the score under. Can be used for searching.
             * @param {Number} [scoreGroup1=0] The secondary group to store the score under. Can be used for searching.
             * @param {Boolean} [scoreOrderDesc=true] When set to `true`, scores are sorted in descending order. When set to `false`, they are sorted in ascending order. All scores in each category need to be sorted in the same order.
             * @param {Boolean} [deleteOldScore=false] When set to `true`, the user's previous score in this category is deleted and replaced. When set to `false`, it is not.
             * @param {String} [scoreParamData=""] A uint64 value represented as a hex string. This value can be used to store some additional data, e.g. the dataID of a {@link nwf.nex.DataStoreUploadObject Data Store} object.
             * @param {String} [uniqueID="0"] If this value is not set, the score is stored using the user's primary ID.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.UPLOAD_SCORE_SUCCESS
             * @see nwf.events.RankingClientEvent.UPLOAD_SCORE_FAILED
             * @async
             */
            uploadScore(scoreValue: number, scoreCategory?: number, scoreGroup0?: number, scoreGroup1?: number, scoreOrderDesc?: boolean, deleteOldScore?: boolean, scoreParamData?: string, uniqueID?: string): number;
            /**
             * Deletes score(s) from the server.
             * @param {Number} [scoreCategory=255] The category of score to delete.  If this is not set, all scores are deleted.
             * @param {String} [uniqueID="0"] If this value is not set, the score(s) are deleted using the user's primary ID.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.DELETE_SCORE_SUCCESS
             * @see nwf.events.RankingClientEvent.DELETE_SCORE_FAILED
             * @async
             */
            deleteScore(scoreCategory?: number, uniqueID?: string): number;
            /**
             * Deletes common data associated with the user from the server.
             * @param {String} [uniqueID="0"] If this value is not set, the common data is deleted using the user's primary ID.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.DELETE_COMMON_DATA_SUCCESS
             * @see nwf.events.RankingClientEvent.DELETE_COMMON_DATA_FAILED
             * @async
             */
            deleteCommonData(uniqueID?: string): number;
            /**
             * Downloads common data associated with the user from the server.
             * @param {String} [uniqueID="0"] If this value is not set, the common data is downloaded using the user's primary ID.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.DOWNLOAD_COMMON_DATA_SUCCESS
             * @see nwf.events.RankingClientEvent.DOWNLOAD_COMMON_DATA_FAILED
             * @async
             */
            downloadCommonData(uniqueID?: string): number;
            /**
             * Uploads a 255 byte Blob of common data associated with the user from the server.
             * @param {Blob} commonData The common data to upload.
             * @param {String} [uniqueID="0"] If this value is not set, the common data is uploaded using the user's primary ID.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.UPLOAD_COMMON_DATA_SUCCESS
             * @see nwf.events.RankingClientEvent.UPLOAD_COMMON_DATA_FAILED
             * @async
             */
            uploadCommonData(commonData: any, uniqueID?: string): number;
            /**
             * Downloads ranking data associated with the user from the server.
             * @param {nwf.nex.RankingSearchParam} searchParam The search value to use.
             * @returns {uint32} Result code.
             * @since 1.4
             * @see nwf.events.RankingClientEvent.DOWNLOAD_RANKING_LIST_SUCCESS
             * @see nwf.events.RankingClientEvent.DOWNLOAD_RANKING_LIST_FAILED
             * @async
             */
            downloadRankingList(searchParam: any): number;
            /**
             * Creates and binds the Ranking Client interface to the NEX Game Server. This must be called before other `RankingClient` methods. Must be logged into the Game Server before this will succeed.
             * @returns {Boolean} Returns `true` if the bind succeeded, or `false` otherwise.
             * @see nwf.nex.GameServer.login
             * @since 1.4
             */
            bind(): boolean;
            /**
             * Accesses an instance of the `RankingClient` singleton.
             *
             * @method getInstance
             * @returns {nwf.nex.RankingClient} The `RankingClient` singleton instance.
             * @since 1.4
             * @static
             */
            static getInstance(): RankingClient;
            /**
             * Method to test for class availability.
             *
             * @method isSupported
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @static
             * @since 1.4
             */
            static isSupported(): boolean;
            /** @ignore */
            private static s_instance;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
        * Method to test whether Nintendo Web Framework is currently running on a Wii U.
        * @returns {Boolean} Returns `false` if the current system is not a Wii U, or `true` if the current system is a Wii U.
        * @since 1.0
        */
        function isWiiU(): boolean;
        /**
         * Method to test whether Nintendo Web Framework is currently running on a PC.
         * @returns {Boolean} Returns `false` if the current system is not a PC, or `true` if the current system is a PC.
         * @since 1.0
         * @removed
         */
        function isPC(): boolean;
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * WebKit Statistics - A class exposing the state of WebKit during execution.
         *
         * @class nwf.system.Stats
         * @removed 1.8.2 The `Stats` class has been removed. The `#getMemoryAllocSizes` and `#getMemoryStats` methods have been moved to the `nwf.system.Memory` class.
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        class Stats {
            /**
             * The current number of paints since the page loaded successfully.
             * @property {uint32} [paintCount=0]
             * @since 1.0
             * @static @readonly
             */
            paintCount: number;
            /**
             * The current number of images in use.
             * @property {uint32} [imageCount=0]
             * @since 1.0
             * @static @readonly
             */
            imageCount: number;
            /**
             * The current number of font caches that are allocated.
             * Every style (bold, italic, etc.) and size (10px, 11px, etc.) used with each font will increment this value. Using `HTML` elements that change the font size can increment this as well. For example, a `<p>` tag and a `<h1>` tag will each count separately for this property.
             * @property {uint32} [fontCacheCount=0]
             * @since 1.0
             * @static @readonly
             */
            fontCacheCount: number;
            /**
             * The current number of transparency layers in use.
             * @property {uint32} [transparencyLayerCount=0]
             * @since 1.0
             * @static @readonly
             */
            transparencyLayerCount: number;
            /**
             * The current number of image buffers in use.
             * @property {uint32} [imageBufferCount=0]
             * @since 1.0
             * @static @readonly
             */
            imageBufferCount: number;
            /**
             * Clears the current statistics and resets them all to zero.
             * @since 1.0
             * @static
             */
            reset(): void;
            /**
             * Prints out all the current statistic values to the console.
             * @since 1.0
             * @static
             */
            print(): void;
            /**
              * Returns an object detailing the current state of memory.
              * @param {Boolean} [printStats=false] If set to `true`, the memory stats are also printed to the console. If set to `false`, they are not printed to the console.
              * @return {Object} A `MemoryStats` object that stores all of the memory stats at the time of the function call.
              * @return {Number} return.totalMainMemory The total memory of the application.
              * @return {Number} return.freeMainMemory The free memory of the application.
              * @return {Number} return.usedMainMemory The used memory of the application.
              * @return {Number} return.totalGraphicsMemory The total memory allocated to the Graphics heap.
              * @return {Number} return.freeGraphicsMemory The memory currently unused by the Graphics heap.
              * @return {Number} return.jscCodeTotalMemory The total memory allocated to the JavaScriptCore code executor.
              *                                            This is specified by **Max JIT Memory** in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html). This will be 0 if JIT is disabled.
              * @return {Number} return.jscCodeFreeMemory The memory currently unused by the JavaScriptCore code executor. This will be 0 if JIT is disabled.
              * @return {Number} return.jscDefaultTotalMemory The total memory allocated to the JavaScriptCore heap. This will be set to a default value unless a value is set in the javascript-object field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.jscDefaultFreeMemory The memory currently unused by the JavaScriptCore heap.
              * @return {Number} return.jscRegisterTotalMemory The total memory allocated to the JavaScriptCore register heap.
              * @return {Number} return.jscRegisterFreeMemory The memory currently unused by the JavaScriptCore register heap.
              * @return {Number} return.wkDefaultTotalMemory The total memory allocated to the WebKit library.
              * @return {Number} return.wkDefaultFreeMemory The memory currently unused by the WebKit library.
              * @return {Number} return.wkCanvasTotalMemory The total size of the optional canvas heap. This will be 0 unless a value is set in the webkit-canvas field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.wkCanvasFreeMemory The free size of the optional canvas heap. This will be 0 unless a value is set in the webkit-canvas field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.wkImageTotalMemory The total size of the optional image heap. This will be 0 unless a value is set in the webkit-image field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.wkImageFreeMemory The total size of the optional image heap. This will be 0 unless a value is set in the webkit-image field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.wkDecodeTotalMemory The total size of the image decode heap.
              * @return {Number} return.wkDecodeFreeMemory The total size of the image decode heap.
              * @return {Number} return.rplCodeTotalMemory The total memory allocated for Nintendo Web Framework static code.
              *                                            This is automatically calculated and set based on the features enabled in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.rplCodeFreeMemory The memory currently unused by Nintendo Web Framework static code.
              * @return {Number} return.extDataStoreTotalMemory The total size of the optional NEX Data Store heap. This will be 0 unless a value is set in the ext-datastore field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.extDataStoreFreeMemory The free size of the optional NEX Data Store heap. This will be 0 unless a value is set in the ext-datastore field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.extMiiverseTotalMemory The total size of the optional Miiverse heap. This will be 0 unless a value is set in the ext-miiverse field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @return {Number} return.extMiiverseFreeMemory The free size of the optional Miiverse heap. This will be 0 unless a value is set in the ext-miiverse field of the Advanced page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html).
              * @since 1.3
              * @static
              */
            getMemoryStats(printStats: boolean): {};
            /**
              * Returns an object detailing the maximum memory allocation sizes currently possible for each heap.
              * __Note:__ _This operation takes a long time to complete. It should likely be used for debugging purposes only._
              * @param {Boolean} [printStats=false] If set to `true`, the maximum memory allocation sizes are also printed to the console. If set to `false`, they are not printed to the console.
              * @return {Object} An object that stores all of the memory allocation stats at the time of the function call.
              * @return {Number} return.graphicsMaxAllocSize The maximum size for any memory allocation currently possible in the graphics renderer heap.
              * @return {Number} return.jscDefaultMaxAllocSize The maximum size for any memory allocation currently possible in the JSC Default heap.
              * @return {Number} return.jscRegisterMaxAllocSize The maximum size for any memory allocation currently possible in the JSC Register heap.
              * @return {Number} return.wkDefaultMaxAllocSize The maximum size for any memory allocation currently possible in the WebKit Default heap.
              * @return {Number} return.wkCanvasMaxAllocSize The maximum size for any memory allocation currently possible in the optional canvas heap (if it exists).
              * @return {Number} return.wkImageMaxAllocSize The maximum size for any memory allocation currently possible in the optional image heap (if it exists).
              * @return {Number} return.wkDecodeMaxAllocSize The maximum size for any memory allocation currently possible in the image decode heap.
              * @since 1.4
              * @static
              */
            getMemoryAllocSizes(): {};
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * Nintendo Web Framework Performance metrics class.
         *
         * @class nwf.system.Performance
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        class Performance {
            /**
             * The maximum FPS achievable based on the v-sync.
             * @property {Number} [MAX_FPS=60]
             * @since 1.0
             * @static @constant
             */
            MAX_FPS: number;
            /**
             * Average time it takes to render all pages (in milliseconds). Includes all displays. Excludes the cursor and external libraries that render on a separate core.
             *
             * __Note:__ Before accessing this property the `#enable` method must be called to begin calculating performance data.
             * @property {Number} [averageRenderTime=16]
             * @since 1.0
             * @static @readonly
             */
            averageRenderTime: number;
            /**
             * How much time has passed since the start of the render frame (in milliseconds). If all pages are static the value will be 0 (ms). This property can be used in conjunction with custom JavaScript timers to help determine whether the application is GPU or CPU bound.
             *
             * __Note:__ Before accessing this property the `#enable` method must be called to begin calculating performance data.
             * @property {Number} [currentRenderTime=16]
             * @since 1.0
             * @static @readonly
             */
            currentRenderTime: number;
            /**
             * The number of milliseconds (with microsecond precision) since the runtime was initialized.
             * @property {Number} [elapsedTime=0.0]
             * @since 1.2
             * @static @readonly
             */
            elapsedTime: number;
            /**
             * Enables performance calculations. Must be called once when the application starts to enable the performance library for the `#averageRenderTime` and `#currentRenderTime` properties to return values.
             * @since 1.0
             * @static
             */
            enable(): void;
            /**
             * Stop calculating performance data.
             * @since 1.0
             * @static
             */
            disable(): void;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * Nintendo Web Framework memory control and metrics class. See the [Memory Guide](../../Manual/nwf/devguide/pm_memory.html) for detailed information and memory use best practices.
         *
         * @class nwf.system.Memory
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        class Memory {
            /**
             * This will schedule garbage collection for the near future, when the heap is available for access.
             * @param {Number} [level = 0] Varies the level of Garbage Collection that will be performed. Valid values are 0, 1, or 2 as outlined below:
             *
             * - 0: Full Garbage Collection. This is the default garbage collection that takes the longest, but may return the most memory.
             * - 1: Mid-level Garbage Collection. A faster garbage collection that will likely return less memory, but takes less time to complete.
             * - 2: Light Garbage Collection. A light garbage collection that can complete quickly.
             *
             * @param {Boolean} [prune = true] Specifies whether or not to perform a prune on the object cache at the same time as collecting garbage.
             * @see nwf.system.Memory.setObjectCacheCapacities
             * @since 1.0
             * @static
             */
            requestGC(level?: number, prune?: boolean): void;
            /**
             * This will attempt to collect garbage immediately. However, it will fail if the heap is not available.
             * Using `nwf.system.Memory.requestGC()` rather than `nwf.system.Memory.forceGC()` is recommended.
             * @param {Number} [level = 0] Varies the level of Garbage Collection that will be performed. Valid values are 0, 1, or 2 as outlined below:
             *
             * - 0: Full Garbage Collection. This is the default garbage collection that takes the longest, but may return the most memory.
             * - 1: Mid-level Garbage Collection. A faster garbage collection that will likely return less memory, but takes less time to complete.
             * - 2: Light Garbage Collection. A light garbage collection that can complete quickly.
             *
             * @param {Boolean} [prune = true] Specifies whether or not to perform a prune on the object cache at the same time as collecting garbage.
             * @see nwf.system.Memory.setObjectCacheCapacities
             * @returns {Boolean} Returns `false` if the heap is not available to be collected, or `true` if the garbage collection is successful.
             * @since 1.0
             * @static
             */
            forceGC(level?: number, prune?: boolean): boolean;
            /**
             * Clears the webkit memory caches, such as the page cache, fonts, and other object resources cache.
             * @since 1.0
             * @static
             */
            clearCaches(): void;
            /**
             * Sets the maximum number of pages that can be stored in the page cache.
             * @param {uint8} maxPages The maximum number of pages that can be stored in the page cache.
             * @since 1.0
             * @static
             */
            setMaxPagesInCache(maxPages: any): void;
            /**
             * Returns the maximum number of pages that can be stored in the page cache.
             * @returns {uint8} The maximum number of pages that can be stored in the page cache.
             * @since 1.0
             * @static
             */
            getMaxPagesInCache(): number;
            /**
             * Sets the memory capacities for the object cache, in bytes.
             *
             * Settings persist across pages and this function does not need to be called multiple times.
             *
             * The object cache is a resource management system to help alleviate reallocation and fragmentation caused by objects that are likely to frequently go into and out of scope (e.g. images).
             * Any object not in the object cache that goes out of scope or has not been used in a certain amount of time† will be freed immediately.
             * However, newly allocated objects will be added to the object cache if possible.
             * When objects are first added to the object cache, they are marked as "live."
             *
             * If a "live" object is unused for a certain amount of time† or goes out of scope, it is not freed immediately; instead it is retained in memory but marked as "dead" in the object cache.
             * Then if the "dead" object is loaded again, it can be marked as "live" and accessed again without reallocating memory or reloading the resource.
             * The benefit is that reanimating a "dead" object will be faster than reallocating a completely freed object and avoid possible fragmentation.
             *
             * The `maxDeadBytes` parameter puts an upper bound on the amount of "dead" data that will be maintained in the cache.
             * However, the limit is not enforced continuously, and the total amount of "dead" data could be more than `maxDeadBytes` until the cached is pruned.
             * Pruning occurs in the following three situations:
             *
             * 1. When `setObjectCacheCapacities` is called.
             * 2. When `requestGC` or `forceGC` is called with the `prune` parameter.
             * 3. When any resource in the cache is garbage collected.
             *
             * The object cache also effects the timing at which decompressed image data is deleted.
             * Even if references to an image are still maintained, the decompressed data for images that have not been displayed in a certain amount of time† might be deleted to free memory‡.
             * If an image is displayed again after its decompressed data has been deleted, it will have to be decompressed again causing a delay.
             * However, the compressed (source) data for images that are maintained in the object cache will not be deleted as long as references to the image are maintained.
             *
             * † This amount of time is calculated dynamically based on many factors and cannot be determined or specified accurately.
             *
             * ‡ Deletion of uncompressed image data will only occur when new resources (images, JavaScript, etc.) are allocated, when `setObjectCacheCapacities` is called or when `#requestGC` or `#forceGC` are called.
             *   To explicitly prune decompressed image data, call `setObjectCacheCapacities` again with the same parameters.
             *
             * Example usage:
             *
             *     // Maintain a 36MB object cache with a static 4MB for "dead" objects and the remaining 32MB for "live" objects
             *     nwf.system.Memory.setObjectCacheCapacities(4*1024*1024, 4*1024*1024, 36*1024*1024);
             *
             * @param {Number} minDeadBytes=0 The minimum amount of data in bytes that will always be reserved for "dead" cached objects.
             * @param {Number} maxDeadBytes=0 The maximum amount of data in bytes that "dead" cached objects are allowed to consume.
             * @param {Number} totalCapacity=0 The maximum amount of data in bytes that the cache will maintain.
             * @since 1.0
             * @static
             */
            setObjectCacheCapacities(minDeadBytes: number, maxDeadBytes: number, totalCapacity: number): void;
            /**
             * Returns an object detailing the current state of memory and optionally prints the status to the console.
             *
             * __Note:__ _From NWF 1.8.3 the structure of the return object has changed._
             *
             * <sup>†</sup> _The amount of total memory available to your application is determined and set based on the features enabled in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Features)._
             *
             * @param {Boolean} [printStats=false] If set to `true`, the memory stats are also printed to the console. If set to `false`, they are not printed to the console.
             * @return {Object} A `MemoryStats` object that stores all of the memory stats (in bytes) at the time of the function call.
             * @return {Number} return.totalMemory The total memory available to the application. <sup>†</sup>
             * @return {Number} return.freeMemory The total free memory of the application.
             * @return {Number} return.usedMemory The total used memory of the application.
             * @return {Number} return.totalGraphicsMemory The total memory allocated to the Graphics Default heap.
             * @return {Number} return.freeGraphicsMemory The memory currently unused by the Graphics Default heap.
             * @return {Number} return.jscCodeTotalMemory The total memory allocated to the JavaScriptCore code executor.
             *                                            This is specified with the **Max JIT Memory** field in the Memory page of [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory). This will be 0 if JIT is disabled.
             * @return {Number} return.jscCodeFreeMemory The memory currently unused by the JavaScriptCore code executor. This will be 0 if JIT is disabled.
             * @return {Number} return.jscDefaultTotalMemory The total memory allocated to the JavaScript Object heap. This will be set to a default value unless a value is set in the **JavaScript Object** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.jscDefaultFreeMemory The memory currently unused by the JavaScript Object heap.
             * @return {Number} return.jscRegisterTotalMemory The total memory allocated to the JavaScript Register heap.
             * @return {Number} return.jscRegisterFreeMemory The memory currently unused by the JavaScript Register heap.
             * @return {Number} return.wkDefaultTotalMemory The total memory allocated to the WebKit library. This a general-purpose heap for allocations. Both WebKit and NWF extensions make allocations from this heap.
             * @return {Number} return.wkDefaultFreeMemory The memory currently unused by the WebKit Default Heap.
             * @return {Number} return.wkCanvasTotalMemory The total size of the optional Canvas heap. This will be set to a default value unless a value is set in the **Canvas** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.wkCanvasFreeMemory The free size of the optional Canvas heap.
             * @return {Number} return.wkImageTotalMemory The total size of the optional Image heap. This will be set to a default value unless a value is set in the **Image** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.wkImageFreeMemory The free size of the optional Image heap.
             * @return {Number} return.extDataStoreTotalMemory The total size of the optional NEX Data Store heap. This will be 0 unless a value is set in the **NEX Data Store** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.extDataStoreFreeMemory The free size of the optional NEX Data Store heap.
             * @return {Number} return.extMiiverseTotalMemory The total size of the optional Miiverse heap. This will be 0 unless a value is set in the **Miiverse** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.extMiiverseFreeMemory The free size of the optional Miiverse heap.
             * @return {Number} return.nwfSystemTotalMemory The total memory allocated for Nintendo Web Framework. Includes static code and dynamic heaps for internal systems. <sup>†</sup>
             * @return {Number} return.nwfSystemFreeMemory The memory currently unused by Nintendo Web Framework internal systems.
             * @return {Number} return.videoTotalMemory The total size of the optional Video heap.  This will be set to a default value unless a value is set in the **Video** field of the Memory page in [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Memory).
             * @return {Number} return.videoFreeMemory The free size of the optional Video heap.
             * @since 1.8.3
             * @static
             */
            getMemoryStats(printStats: boolean): any;
            /**
             * Returns an object detailing the maximum memory allocation sizes currently possible for each heap.
             *
             * __Note:__ _This operation takes a long time to complete. It should likely be used for debugging purposes only._
             * __Note:__ _From NWF 1.8.3 the structure of the return object has changed._
             *
             * @param {Boolean} [printStats=false] If set to `true`, the maximum memory allocation sizes are also printed to the console. If set to `false`, they are not printed to the console.
             * @return {Object} An object that stores all of the memory allocation stats at the time of the function call.
             * @return {Number} return.graphicsMaxAllocSize The maximum size for any memory allocation currently possible in the Graphics Default heap.
             * @return {Number} return.jscRegisterMaxAllocSize The maximum size for any memory allocation currently possible in the JavaScript Register heap.
             * @return {Number} return.wkDefaultMaxAllocSize The maximum size for any memory allocation currently possible in the WebKit Default heap.
             * @return {Number} return.wkCanvasMaxAllocSize The maximum size for any memory allocation currently possible in the optional Canvas heap (if it exists).
             * @return {Number} return.wkImageMaxAllocSize The maximum size for any memory allocation currently possible in the optional Image heap (if it exists).
             * @since 1.8.3
             * @static
             */
            getMemoryAllocSizes(): any;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * Class for the Wii U Auto Power-Down (APD) functionality.
         *
         * The Wii U console can automatically power down when there is no user input.
         * Users are able to turn APD on or off in the settings menu. Also, users can change the time when APD occurs. By default, APD is enabled and the time is set to 1 hour (60 minutes).
         *
         * @class nwf.system.APD
         * @author Ryan Lynd
         * @author Shawn Gates
         */
        class APD {
            /**
             * Returns `true` if the Wii U console's built in Auto Power-Down (APD) feature is enabled, or `false` if it is disabled.
             *
             * __Note:__ _If the user has disabled APD in the Wii U settings, this property will always return `false`._
             * @property {Boolean} [isEnabled=false]
             * @readonly
             * @since 1.0
             * @static
             */
            isEnabled: boolean;
            /**
             * Gets the user set default time period for APD to occur in seconds.
             * @property {uint32} [timePeriod=3600]
             * @readonly
             * @since 1.0
             * @static
             */
            timePeriod: number;
            /**
             * Gets the remaining time in seconds before Auto Power-Down (APD) is to occur.
             * Counter decrements every second when no user input is detected.
             * Upon user input, the counter is reset to the the value of #timePeriod.
             * @property {uint32} [timeBeforeAPD=3600]
             * @readonly
             * @since 1.0
             * @static
             */
            timeBeforeAPD: number;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * The `Config` class provides access to the current application's project settings during runtime.
         *
         * @class nwf.system.Config
         * @author Nate Long
         * @author Dave White
         * @author Shawn Gates
         */
        class Config {
            /**
             * Shows whether the debug option to allow connecting to independent servers without first getting a service token is enabled.
             * This will be `true` if the **Unrestricted Network Access (debug only)** option in the Network page of Project Settings is not checked, or `false` if it is.
             *
             * @property {Boolean} serviceTokenRequired=true
             * @since 1.8.2
             * @readonly
             * @static
             */
            serviceTokenRequired: boolean;
            /**
             * A string representation of the background color set for the displays.
             * This is set with the **Display Background Color** option in the Display page of Project Settings.
             *
             * The background color of the display can also be changed with nwf.display.DisplayManager's `{@link nwf.display.DisplayManager#backgroundColor backgroundColor}` property.
             * The value of `displayBackgroundColor` will always equal what is set in Project Settings regardless of changes made to `{@link nwf.display.DisplayManager#backgroundColor backgroundColor}`.
             *
             * @property {String} displayBackgroundColor='#000000'
             * @since 1.8.2
             * @readonly
             * @static
             */
            displayBackgroundColor: string;
            /**
             * A boolean value that specifies whether the application is set to require networking.
             * This will be `true` if the **Application requires networking** option in the Network page of Project Settings is checked, or `false` if it is not.
             *
             * @property {Boolean} networkingRequired=true
             * @since 1.8.2
             * @readonly
             * @static
             */
            networkingRequired: boolean;
            /**
             * This will be `true` if the **Application Type** option in the ROM Info page of Project Settings is set to **Service Application**;
             * this will be `false` if it is set to any other value.
             *
             * @property {Boolean} isServiceApplication=true
             * @since 1.8.2
             * @readonly
             * @static
             */
            isServiceApplication: boolean;
            /**
             * A string representation of the **Long Name** field in the Metadata page of Project Settings.
             * This value represents the first line of the **Long Name**; for the second line see `#longNameLine2`.
             * This will match the language the Wii U System is set to. This can be checked with the `{@link nwf.system.WiiUSystem#languageCode languageCode}` property of nwf.system.WiiUSystem.
             *
             * @property {String} longNameLine1=''
             * @since 1.8.2
             * @readonly
             * @static
             */
            longNameLine1: string;
            /**
             * A string representation of the **Long Name** field in the Metadata page of Project Settings.
             * This value represents the second line of the **Long Name**; for the first line see `#longNameLine1`.
             * This will match the language the Wii U System is set to. This can be checked with the `{@link nwf.system.WiiUSystem#languageCode languageCode}` property of nwf.system.WiiUSystem.
             *
             * @property {String} longNameLine2=''
             * @since 1.8.2
             * @readonly
             * @static
             */
            longNameLine2: string;
            /**
             * A string representation of the **Short Name** field in the Metadata page of Project Settings.
             * This will match the language the Wii U System is set to. This can be checked with the `{@link nwf.system.WiiUSystem#languageCode languageCode}` property of nwf.system.WiiUSystem.
             *
             * @property {String} shortName=''
             * @since 1.8.2
             * @readonly
             * @static
             */
            shortName: string;
            /**
             * A string representation of the **Publisher** field in the Metadata page of Project Settings.
             * This will match the language the Wii U System is set to. This can be checked with the `{@link nwf.system.WiiUSystem#languageCode languageCode}` property of nwf.system.WiiUSystem.
             *
             * @property {String} publisher=''
             * @since 1.8.2
             * @readonly
             * @static
             */
            publisher: string;
        }
    }
}
declare module nwf {
    module system {
        /**
         * The Error Manager is provided as an optional library to aid implementation and guideline compliance for basic error handling.
         * The library is designed to be simple to use, but powerful enough to handle larger, more complicated applications that need specialized control over errors.
         *
         * Usage
         * ---
         *
         * This library can be used in its default state by including the library in the main HTML file as follows:
         *
         *     <script src="path/to/SupportLibraries.min.js"></script>
         *     <script>
         *         nwf.system.ErrorManager.initialize();
         *     </script>
         *
         * It is also possible to add event listeners to handle specific errors while allowing the Error Manager to handle the rest:
         *
         *      nwf.system.ErrorManager.addEventListener(
         *          nwf.events.SystemErrorEvent.ERROR,
         *          function(err) {
         *              if(err.errorCode === 1234567) {
         *                  // handle the error
         *                  return false;
         *              }
         *          }
         *      );
         *
         * Any listeners added to the Error Manager will be called before the Error Manager uses its default handling mechanism (usually displaying the error dialog).
         * If a listener returns `false`, the Error Manager will not attempt to handle the error itself, assuming that a listener has handled it already.
         * Event listeners can be added at any point during a run of an application--the Error Manager will begin to fire the attached listener for each error as soon as the listener is added.
         *
         * @author Nate Long
         * @author Shawn Gates
         * @class nwf.system.ErrorManager
         * @lib SupportLibraries.js
         */
        class ErrorManager {
            /**
             * Begin listening for errors and firing listeners
             *
             * @method initialize
             * @static
             * @since 1.8.3
             */
            static initialize(): void;
            /**
             * Registers an event listener handler so that the listener can be notified when events are dispatched. Subsequent calls to `addEventListener` with a different listener and/or scope will result in the separate registration of the listener.
             *
             * To prevent possible memory leaks, when you no longer need an event listener, remove it by calling `#removeEventListener` or `#removeAllEventListeners`. This is especially true when switching contexts by changing pages.
             *
             * _If multiple identical `EventListeners` are registered on the same `EventTarget` with the same parameters, the duplicate instances are discarded._
             *
             * @param {String} type The event type for which the user is registering.
             * @param {Function} listener  The listener function that processes the event. This function must accept an `Event` object as its only parameter.
             * @param {Object} [scope=null]  The scope on which to apply the listener call. This will affect the value of `this` within the listener function block. By default the scope will be set to the window or "root" scope of the dispatcher object. Do not use this parameter when in strict mode, as it will cause an error.
             * @static
             * @since 1.8.3
             */
            addEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Allows the removal of event listeners from the event target.
             *
             * _The `listener` function and `scope` must match that which was used to register the event._
             *
             * @see {@link #removeAllEventListeners}
             * @param {String} type Specifies the event type of the `EventListener` being removed.
             * @param {Function} listener  The listener function to be removed.
             * @param {Object} [scope=null]  The scope object of the `EventListener` being removed. If a listener was registered twice with different scopes, each must be removed separately.
             * @static
             * @since 1.8.3
             */
            removeEventListener(type: string, listener: any, scope?: any): void;
            /**
             * Removes **ALL** event listeners from the event target. Always double-check to make sure you really want to remove every event listener.
             * @static
             * @since 1.8.3
             */
            removeAllEventListeners(): void;
            /**
             * Checks whether the `EventDispatcher` object has any listeners registered for a specific type of event.
             *
             * __Note:__ This will return `true` by default because the library adds some common error handlers. Calling `#removeAllEventListeners` will cause it to return `false`.
             *
             * @param {String} type The type of event to check.
             * @returns {Boolean} Returns `true` if a listener of the specified type is registered, or `false` otherwise.
             * @static
             * @since 1.8.3
             */
            hasEventListener(type: any): boolean;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * `EShopPage` constants.
         *
         * @enum nwf.system.EShopPage
         * @author Shawn Gates
         */
        var EShopPage: {
            FRONT_PAGE: number;
            TITLE: number;
            AOC_LIST: number;
            SPECIFIC_AOC: number;
            SERVICE_TICKET: number;
            REDEEM: number;
        };
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * EShopSortKey constants.
         *
         * @enum nwf.system.EShopSortKey
         * @author Shawn Gates
         */
        var EShopSortKey: {
            NEW: string;
            POPULAR: string;
            NAME: string;
        };
    }
}
declare module nwf {
    module system {
        class EShopSwitchParam {
            /**
             * Class defining the parameters to use when switching to the eShop with `nwf.system.WiiUSystem.switchToEShop`.
             *
             * @class nwf.system.EShopSwitchParam
             * @author Shawn Gates
             */
            /**
             * Creates a new `EShopSwitchParam` object.
             * @method constructor
             * @since 1.8.1
             */
            constructor();
            /**
             * The page in the eShop to switch to.
             *
             * @property {Number} [startPage=nwf.system.EShopPage.TITLE]
             * @see nwf.system.EShopPage
             * @since 1.8.1
             */
            startPage: number;
            /**
             * The `UniqueID` of the application or `{@link nwf.aoc.AOCTitle AOCTitle}` to load.
             * This property and `#dstTitleID` do not both need to be set; if they are both set then the value specified on `#dstUniqueID` will be used.
             *
             * The value to use here will be different depending on which `#startPage` is specified.
             * For `nwf.system.EShopPage.TITLE` or `nwf.system.EShopPage.SERVICE_TICKET` this should correspond to the target applications `UniqueID`, but for `nwf.system.EShopPage.AOC_LIST` and `nwf.system.EShopPage.SPECIFIC_AOC` this should correspond to the `UniqueID` of the `{@link nwf.aoc.AOCTitle AOCTitle}` to load.
             * If `#startPage` is set to `nwf.system.EShopPage.FRONT_PAGE` or `nwf.system.EShopPage.REDEEM` then this property will be ignored.
             *
             * __IMPORTANT:__   By default, it is not possible to jump to a Nintendo eShop page of a different application.
             * If you want to do this, contact Nintendo developer support and provide the name of your title and the titles that you want to jump to, so that the servers can be configured appropriately.
             *
             * @property {String} [dstUniqueID='']
             * @since 1.8.1
             */
            dstUniqueID: string;
            /**
             * The `titleID` of the application or `{@link nwf.aoc.AOCTitle AOCTitle}` to load.
             * This property and `#dstUniqueID` do not both need to be set, if they are both set then the value specified on `#dstUniqueID` will be used.
             *
             * The value to use here will be different depending on which `#startPage` is specified.
             * For `nwf.system.EShopPage.TITLE` or `nwf.system.EShopPage.SERVICE_TICKET` this should correspond to the target applications `titleID`, but for `nwf.system.EShopPage.AOC_LIST` and `nwf.system.EShopPage.SPECIFIC_AOC` this should correspond to the `titleID` of the `{@link nwf.aoc.AOCTitle AOCTitle}` to load.
             * If `#startPage` is set to `nwf.system.EShopPage.FRONT_PAGE` or `nwf.system.EShopPage.REDEEM` then this property will be ignored.
             *
             * __IMPORTANT:__   By default, it is not possible to jump to a Nintendo eShop page of a different application.
             * If you want to do this, contact Nintendo developer support and provide the name of your title and the titles that you want to jump to, so that the servers can be configured appropriately.
             *
             * @property {String} [dstTitleID='']
             * @since 1.8.1
             */
            dstTitleID: string;
            /**
             * The product code of the `{@link nwf.aoc.AOCItem AOCItem}` to the load.
             * This property is only used when `#startPage` is set to `nwf.system.EShopPage.SPECIFIC_AOC`, for any other value this property will be ignored.
             * @property {String} [itemCode='']
             * @since 1.8.1
             */
            itemCode: string;
            /**
             * When displaying a list of `{@link nwf.aoc.AOCItem AOCItem}`'s the results will be filtered by the `searchWord`.
             * This property is only used when `#startPage` is set to `nwf.system.EShopPage.AOC_LIST`, for any other value this property will be ignored.
             * If this is left blank then all of the `{@link nwf.aoc.AOCItem AOCItem}`'s for the specified `{@link nwf.aoc.AOCTitle AOCTitle}` will be listed.
             * Must be a URL-encoded `UTF-8` string that is no more than 50 characters when decoded.
             * @property {String} [searchWord='']
             * @since 1.8.1
             */
            searchWord: string;
            /**
             * When displaying a list of `{@link nwf.aoc.AOCItem AOCItem}`'s the results will be sorted according to the specified `sortKey`.
             * This property is only used when `#startPage` is set to `nwf.system.EShopPage.AOC_LIST`, for any other value this property will be ignored.
             * @property {String} [sortKey=nwf.system.EShopSortKey.NEW]
             * @see nwf.system.EShopSortKey
             * @since 1.8.1
             */
            sortKey: string;
            /**
             * The `titleID` of the current application.
             * This value must be set for the application jump to the Nintendo eShop to be successful.
             *
             * @property {String} [srcTitleID='']
             * @since 1.8.1
             */
            srcTitleID: string;
            /**
             * The download code to pass to the redeem page of the eShop.
             * This property is only used when `#startPage` is set to `nwf.system.EShopPage.REDEEM`, for any other value this property will be ignored.
             * If this is left empty then the user will be prompted to enter the code on the page.
             * @property {String} [downloadCode='']
             * @since 1.8.1
             */
            downloadCode: string;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * WiiUSettingsScreen constants.
         *
         * @enum nwf.system.WiiUSettingsScreen
         * @author Ryan Lynd
         */
        var WiiUSettingsScreen: {
            MAIN_SETTINGS_SCREEN: number;
            INTERNET_SETTINGS_SCREEN: number;
            DATA_MANAGEMENT_SCREEN: number;
            TV_REMOTE_SCREEN: number;
            DATE_TIME_SCREEN: number;
            REGION_SCREEN: number;
            SYSTEM_UPDATE_SCREEN: number;
        };
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * WiiULanguageCode constants.
         *
         * @enum nwf.system.WiiULanguageCode
         * @author Ryan Lynd
         */
        var WiiULanguageCode: {
            CHINESE: number;
            DUTCH: number;
            ENGLISH: number;
            FRENCH: number;
            GERMAN: number;
            ITALIAN: number;
            INVALID: number;
            JAPANESE: number;
            KOREAN: number;
            PORTUGUESE: number;
            RUSSIAN: number;
            SPANISH: number;
            TAIWANESE: number;
            ALL: number;
            SYSTEM: number;
        };
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     */
    module system {
        /**
         * WiiURegionCode constants.
         *
         * @enum nwf.system.WiiURegionCode
         * @author Ryan Lynd
         */
        var WiiURegionCode: {
            ALL: number;
            CHN: number;
            EUR: number;
            INVALID: number;
            JPN: number;
            KOR: number;
            TWN: number;
            USA: number;
        };
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * WiiUCountryCode constants.
         *
         * @enum nwf.system.WiiUCountryCode
         * @author Ryan Lynd
         */
        var WiiUCountryCode: {
            JAPAN: number;
            ANGUILLA: number;
            ANTIGUA_AND_BARBUDA: number;
            ARGENTINE_REPUBLIC: number;
            ARUBA: number;
            COMMONWEALTH_OF_THE_BAHAMAS: number;
            BARBADOS: number;
            BELIZE: number;
            REPUBLIC_OF_BOLIVIA: number;
            FEDERATIVE_REPUBLIC_OF_BRAZIL: number;
            BRITISH_VIRGIN_ISLANDS: number;
            CANADA: number;
            CAYMAN_ISLANDS: number;
            REPUBLIC_OF_CHILE: number;
            REPUBLIC_OF_COLOMBIA: number;
            REPUBLIC_OF_COSTA_RICA: number;
            COMMONWEALTH_OF_DOMINICA: number;
            DOMINICAN_REPUBLIC: number;
            REPUBLIC_OF_ECUADOR: number;
            REPUBLIC_OF_EL_SALVADOR: number;
            GUIANA: number;
            GRENADA: number;
            GUADELOUPE: number;
            REPUBLIC_OF_GUATEMALA: number;
            CO_OPERATIVE_REPUBLIC_OF_GUYANA: number;
            REPUBLIC_OF_HAITI: number;
            REPUBLIC_OF_HONDURAS: number;
            JAMAICA: number;
            MARTINIQUE: number;
            UNITED_MEXICAN_STATES: number;
            MONTSERRAT: number;
            NEDERLANDSE_ANTILLEN: number;
            REPUBLIC_OF_NICARAGUA: number;
            REPUBLIC_OF_PANAMA: number;
            REPUBLIC_OF_PARAGUAY: number;
            REPUBLIC_OF_PERU: number;
            SAINT_CHRISTOPHER_AND_NEVIS: number;
            SAINT_LUCIA: number;
            SAINT_VINCENT_AND_THE_GRENADINES: number;
            REPUBLIC_OF_SURINAME: number;
            REPUBLIC_OF_TRINIDAD_AND_TOBAGO: number;
            TURKS_AND_CAICOS_ISLANDS: number;
            UNITED_STATES_OF_AMERICA: number;
            ORIENTAL_REPUBLIC_OF_URUGUAY: number;
            VIRGIN_ISLANDS_OF_THE_UNITED_STATES: number;
            BOLIVARIAN_REPUBLIC_OF_VENEZUELA: number;
            REPUBLIC_OF_ALBANIA: number;
            AUSTRALIA: number;
            REPUBLIC_OF_AUSTRIA: number;
            KINGDOM_OF_BELGIUM: number;
            BOSNIA_AND_HERZEGOVINA: number;
            REPUBLIC_OF_BOTSWANA: number;
            REPUBLIC_OF_BULGARIA: number;
            REPUBLIC_OF_CROATIA: number;
            REPUBLIC_OF_CYPRUS: number;
            CZECH_REPUBLIC: number;
            KINGDOM_OF_DENMARK: number;
            REPUBLIC_OF_ESTONIA: number;
            REPUBLIC_OF_FINLAND: number;
            FRENCH_REPUBLIC: number;
            FEDERAL_REPUBLIC_OF_GERMANY: number;
            HELLENIC_REPUBLIC: number;
            REPUBLIC_OF_HUNGARY: number;
            REPUBLIC_OF_ICELAND: number;
            IRELAND: number;
            REPUBLIC_OF_ITALY: number;
            REPUBLIC_OF_LATVIA: number;
            KINGDOM_OF_LESOTHO: number;
            PRINCIPALITY_OF_LIECHTENSTEIN: number;
            REPUBLIC_OF_LITHUANIA: number;
            GRAND_DUCHY_OF_LUXEMBOURG: number;
            FORMER_YUGOSLAV_REPUBLIC_OF_MACEDONIA: number;
            REPUBLIC_OF_MALTA: number;
            REPUBLIC_OF_MONTENEGRO: number;
            REPUBLIC_OF_MOZAMBIQUE: number;
            REPUBLIC_OF_NAMIBIA: number;
            KINGDOM_OF_THE_NETHERLANDS: number;
            NEW_ZEALAND: number;
            KINGDOM_OF_NORWAY: number;
            REPUBLIC_OF_POLAND: number;
            PORTUGUESE_REPUBLIC: number;
            ROMANIA: number;
            RUSSIAN_FEDERATION: number;
            REPUBLIC_OF_SERBIA_AND_REPUBLIC_OF_KOSOVO: number;
            SLOVAK_REPUBLIC: number;
            REPUBLIC_OF_SLOVENIA: number;
            REPUBLIC_OF_SOUTH_AFRICA: number;
            SPAIN: number;
            KINGDOM_OF_SWAZILAND: number;
            KINGDOM_OF_SWEDEN: number;
            SWISS_CONFEDERATION: number;
            REPUBLIC_OF_TURKEY: number;
            UNITED_KINGDOM_OF_GREAT_BRITAIN_AND_NORTHERN_IRELAND: number;
            REPUBLIC_OF_ZAMBIA: number;
            REPUBLIC_OF_ZIMBABWE: number;
            AZERBAIJAN: number;
            MAURITANIA: number;
            MALI: number;
            NIGER: number;
            CHAD: number;
            SUDAN: number;
            ERITREA: number;
            DJIBOUTI: number;
            SOMALIA: number;
            ANDORRA: number;
            GIBRALTAR: number;
            GUERNSEY: number;
            ISLE_OF_MAN: number;
            JERSEY: number;
            MONACO: number;
            TAIWAN: number;
            REPUBLIC_OF_KOREA: number;
            HONG_KONG: number;
            MACAU: number;
            REPUBLIC_OF_INDONESIA: number;
            REPUBLIC_OF_SINGAPORE: number;
            KINGDOM_OF_THAILAND: number;
            REPUBLIC_OF_THE_PHILIPPINES: number;
            MALAYSIA: number;
            PEOPLES_REPUBLIC_OF_CHINA: number;
            UNITED_ARAB_EMIRATES: number;
            INDIA: number;
            ARAB_REPUBLIC_OF_EGYPT: number;
            SULTANATE_OF_OMAN: number;
            STATE_OF_QATAR: number;
            STATE_OF_KUWAIT: number;
            KINGDOM_OF_SAUDI_ARABIA: number;
            SYRIAN_ARAB_REPUBLIC: number;
            KINGDOM_OF_BAHRAIN: number;
            HASHEMITE_KINGDOM_OF_JORDAN: number;
            SAN_MARINO: number;
            VATICAN_CITY: number;
            BERMUDA: number;
            NIGERIA: number;
            ANGOLA: number;
            GHANA: number;
            OTHERS: number;
            UNKNOWN: number;
        };
    }
}
declare module nwf {
    /**
     *
     * @class nwf.system
     * @author Ryan Lynd
     */
    module system {
        /**
         * SystemErrorType constants.
         *
         * @enum nwf.system.SystemErrorType
         * @author Ryan Lynd
         */
        var SystemErrorType: {
            AC: number;
            ACP: number;
            ACT: number;
            CMN_MSG: number;
            FP: number;
            FS: number;
            KPAD: number;
            NWF: number;
            SAVE: number;
            SSI: number;
            UDS: number;
            OLV: number;
            VPAD: number;
            WPAD: number;
            NEX: number;
            EC: number;
            EC_APPLET: number;
            ESHOP_REST: number;
            AMIIBO: number;
        };
    }
}
declare module nwf {
    /**
     *
     * @class nwf.system
     * @author Ryan Lynd
     */
    module system {
        /**
         * SystemErrorLevel constants.
         *
         * @enum nwf.system.SystemErrorLevel
         * @author Aaron Ward
         * @author Nate Long
         * @author Shawn Gates
         */
        var SystemErrorLevel: {
            ERROR_LEVEL_WARNING: number;
            ERROR_LEVEL_ERROR: number;
            ERROR_LEVEL_FATAL: number;
        };
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        /**
         * SystemErrorCode constants.
         *
         * @deprecated 1.9.0 Please see the Wii U Error Code List available on the Nintendo technical support site.
         * @enum nwf.system.SystemErrorCode
         * @author Ryan Lynd
         */
        var SystemErrorCode: {
            ACCOUNT_ALREADY_DELETED: number;
            ACCOUNT_ALREADY_LOADED: number;
            ACCOUNT_ID_ALREADY_EXISTS: number;
            ACCOUNT_ID_CHANGED: number;
            ACCOUNT_ID_FORMAT_INVALID: number;
            ACCOUNT_ID_NOT_ACCEPTABLE: number;
            ACCOUNT_ID_PASSWORD_SAME: number;
            ACCOUNT_LOCKED: number;
            ACCOUNT_NOT_COMMITTED: number;
            ACCOUNT_NOT_FOUND: number;
            ACCOUNT_NOT_LOADED: number;
            ACCOUNT_PASSWORD_NOT_ACCEPTABLE: number;
            ACCOUNT_TOKEN_EXPIRED: number;
            ACP_STATUS_ACCOUNT_ERROR: number;
            ACP_STATUS_BROWSER_REQUIRED: number;
            ACP_STATUS_DEVICE_FULL: number;
            ACP_STATUS_DEVICE_NOT_FOUND: number;
            ACP_STATUS_DIR_NOT_FOUND: number;
            ACP_STATUS_GAMEPAD_REQUIRED: number;
            ACP_STATUS_FILE_NOT_FOUND: number;
            ACP_STATUS_INCORRECT_PINCODE: number;
            ACP_STATUS_INVALID_LOGO: number;
            ACP_STATUS_INVALID_PARAM: number;
            ACP_STATUS_INVALID_REGION: number;
            ACP_STATUS_INVALID_XML_FILE: number;
            ACP_STATUS_MEDIA_NOTREADY: number;
            ACP_STATUS_NETACCOUNT_ERROR: number;
            ACP_STATUS_NETACCOUNT_REQUIRED: number;
            ACP_STATUS_NETSETTING_REQUIRED: number;
            ACP_STATUS_NOT_FOUND: number;
            ACP_STATUS_NOTPRESENT_RATING: number;
            ACP_STATUS_OLV_REQUIRED: number;
            ACP_STATUS_PENDING_RATING: number;
            ACP_STATUS_PERMISSION_ERROR: number;
            ACP_STATUS_RESOURCE_ERROR: number;
            ACP_STATUS_RESTRICTED_RATING: number;
            ACP_STATUS_SYSTEM_MEMORY: number;
            ACP_STATUS_TITLE_NOT_FOUND: number;
            ACP_STATUS_UNSUPPORTED: number;
            ACP_STATUS_XML_ITEM_NOT_FOUND: number;
            APPLICATION_UPDATE_REQUIRED: number;
            AUTHENTICATION_HTTP_CONNECTION_ERROR: number;
            AUTHENTICATION_HTTP_DNS_ERROR: number;
            AUTHENTICATION_HTTP_GET_PROXY_SETTING: number;
            AUTHENTICATION_INVALID_PARAM: number;
            AUTHENTICATION_LOCKED: number;
            AUTHENTICATION_MOVE_COUNT_UNMATCH: number;
            AUTHENTICATION_PRINCIPAL_ID_UNMATCHED: number;
            AUTHENTICATION_TOKEN_EXPIRED: number;
            AUTHENTICATION_TOKEN_PARSE_ERROR: number;
            AUTHENTICATION_UNDER_MAINTENANCE: number;
            AUTHENTICATION_UNKNOWN: number;
            AUTHENTICATION_UNSUPPORTED_VERSION: number;
            AUTHENTICATION_VALIDATION_FAILED: number;
            BAD_FORMAT_PARAMETER: number;
            BAD_FORMAT_REQUEST: number;
            BAD_FORMAT_RESPONSE: number;
            BANNED_ACCOUNT_ALL: number;
            BANNED_ACCOUNT_IN_APPLICATION: number;
            BANNED_ACCOUNT_IN_INDEPENDENT_SERVICE: number;
            BANNED_ACCOUNT_IN_NEX_SERVICE: number;
            BANNED_DEVICE_ALL: number;
            BANNED_DEVICE_IN_APPLICATION: number;
            BANNED_DEVICE_IN_INDEPENDENT_SERVICE: number;
            BANNED_DEVICE_IN_NEX_SERVICE: number;
            CMN_MSG_FATAL: number;
            CMN_MSG_FORGET_PIN_CODE: number;
            CMN_MSG_FUNCTION_PROTECTED: number;
            CMN_MSG_INTERNET_BROWSER_PROTECTED: number;
            CMN_MSG_JUMP_ACCOUNT_SETTING: number;
            CMN_MSG_JUMP_ACCOUNT_SETTING_2: number;
            CMN_MSG_JUMP_APP_REBOOT: number;
            CMN_MSG_JUMP_SETTING_COUNTRY: number;
            CMN_MSG_JUMP_SETTING_DATA_MANAGE: number;
            CMN_MSG_JUMP_SETTING_DATE_TIME: number;
            CMN_MSG_JUMP_SETTING_INTERNET: number;
            CMN_MSG_JUMP_SETTING_TOP: number;
            CMN_MSG_JUMP_SETTING_UPDATE: number;
            CMN_MSG_MII_ALREADY_SAVED: number;
            CMN_MSG_MII_CANT_SAVE: number;
            CMN_MSG_MII_NO_SPACE: number;
            CMN_MSG_MII_OVER_WRITE_CONFIRM: number;
            CMN_MSG_NEED_WII_BALANCE_BOARD: number;
            CMN_MSG_NEED_WII_CLASSIC_CONTROLLER: number;
            CMN_MSG_NEED_WII_NUNCHUK: number;
            CMN_MSG_NEED_WII_REMOTE: number;
            CMN_MSG_NEED_WII_REMOTE_PLUS: number;
            CMN_MSG_NEED_WII_U_GAMEPAD: number;
            CMN_MSG_NEED_WII_U_PRO_CONTROLLER: number;
            CMN_MSG_NETWORK_FUNCTION_PROTECTED: number;
            CMN_MSG_NGWORD_ACCEPTABLE: number;
            CMN_MSG_NGWORD_NOT_ACCEPTABLE: number;
            CMN_MSG_NOT_MATCH_EMAIL: number;
            CMN_MSG_NOT_MATCH_PASSWORD: number;
            CMN_MSG_NUMBER_NOT_ACCEPTABLE: number;
            CMN_MSG_NUMBER_OVER_LIMIT_1: number;
            CMN_MSG_NUMBER_OVER_LIMIT_2: number;
            CMN_MSG_NUMBER_OVER_LIMIT_3: number;
            CMN_MSG_NUMBER_OVER_LIMIT_4: number;
            CMN_MSG_NUMBER_OVER_LIMIT_5: number;
            CMN_MSG_NUMBER_OVER_LIMIT_6: number;
            CMN_MSG_NUMBER_OVER_LIMIT_7: number;
            CMN_MSG_NUMBER_OVER_LIMIT_8: number;
            CMN_MSG_NUMBER_OVER_LIMIT_9: number;
            CMN_MSG_PROTECTION_RELEASED: number;
            CMN_MSG_RELEASE_PARENTAL_CONTROL: number;
            CMN_MSG_SWKBD_FATAL: number;
            CMN_MSG_TEXT_NO_INPUT: number;
            CMN_MSG_TEXT_OVER_LIMIT: number;
            CMN_MSG_WII_BALANCE_BOARD_NO_BATTERY: number;
            CMN_MSG_WII_REMOTE_NO_BATTERY: number;
            CMN_MSG_WII_U_GAMEPAD_NO_BATTERY: number;
            CMN_MSG_WII_U_PRO_CONTROLLER_NO_BATTERY: number;
            CMN_MSG_WIIEMAIL_NOT_ACCEPTABLE: number;
            CMN_MSG_WRONG_FRIEND_CODE: number;
            CMN_MSG_WRONG_INPUT: number;
            CMN_MSG_WRONG_NNID: number;
            CMN_MSG_WRONG_PASSWORD: number;
            CMN_MSG_WRONG_PIN_CODE: number;
            CONFIRMATION_CODE_EXPIRED: number;
            CONNECTED: number;
            COPPA_NOT_ACCEPTED: number;
            CORE_ACCESS_DENIED: number;
            CORE_BUFFER_OVERFLOW: number;
            CORE_CALL_INITIATION_FAILURE: number;
            CORE_EXCEPTION: number;
            CORE_INITIALIZATION_FAILURE: number;
            CORE_INVALID_ARGUMENT: number;
            CORE_INVALID_HANDLE: number;
            CORE_INVALID_INDEX: number;
            CORE_INVALID_LOCK_STATE: number;
            CORE_INVALID_POINTER: number;
            CORE_NOT_IMPLEMENTED: number;
            CORE_OPERATION_ABORTED: number;
            CORE_OUT_OF_MEMORY: number;
            CORE_REGISTRATION_ERROR: number;
            CORE_TIMEOUT: number;
            CORE_UNKNOWN: number;
            COUNTRY_MISMATCH: number;
            CREDIT_CARD_BLACKLISTED: number;
            CREDIT_CARD_DATE_EXPIRED: number;
            CREDIT_CARD_DECLINED: number;
            CREDIT_CARD_GENERAL_FAILURE: number;
            CREDIT_CARD_NUMBER_WRONG: number;
            CREDIT_CARD_PIN_WRONG: number;
            CURLE_ABORTED_BY_CALLBACK: number;
            CURLE_AGAIN: number;
            CURLE_BAD_CONTENT_ENCODING: number;
            CURLE_BAD_DOWNLOAD_RESUME: number;
            CURLE_BAD_FUNCTION_ARGUMEN: number;
            CURLE_CHUNK_FAILED: number;
            CURLE_CONV_FAILED: number;
            CURLE_CONV_REQD: number;
            CURLE_COULDNT_CONNECT: number;
            CURLE_COULDNT_RESOLVE_HOST: number;
            CURLE_COULDNT_RESOLVE_PROXY: number;
            CURLE_CURLE_POST_ERROR: number;
            CURLE_CURLE_RETURNED_ERROR: number;
            CURLE_FAILED_INIT: number;
            CURLE_FILE_COULDNT_READ_FILE: number;
            CURLE_FUNCTION_NOT_FOUND: number;
            CURLE_GOT_NOTHING: number;
            CURLE_INTERFACE_FAILED: number;
            CURLE_NOT_BUILT_IN: number;
            CURLE_OPERATION_TIMEDOUT: number;
            CURLE_OUT_OF_MEMORY: number;
            CURLE_PARTIAL_FILE: number;
            CURLE_PEER_FAILED_VERIFICATION: number;
            CURLE_QUOTE_ERROR: number;
            CURLE_RANGE_ERROR: number;
            CURLE_READ_ERROR: number;
            CURLE_RECV_ERROR: number;
            CURLE_REMOTE_ACCESS_DENIED: number;
            CURLE_REMOTE_FILE_NOT_FOUND: number;
            CURLE_RTSP_CSEQ_ERROR: number;
            CURLE_RTSP_SESSION_ERROR: number;
            CURLE_SEND_ERROR: number;
            CURLE_SSH: number;
            CURLE_SSL_CACERT: number;
            CURLE_SSL_CACERT_BADFILE: number;
            CURLE_SSL_CERTPROBLEM: number;
            CURLE_SSL_CIPHER: number;
            CURLE_SSL_CONNECT_ERROR: number;
            CURLE_SSL_CRL_BADFILE: number;
            CURLE_SSL_ENGINE_NOTFOUND: number;
            CURLE_SSL_ENGINE_SETFAILED: number;
            CURLE_SSL_ISSUER_ERROR: number;
            CURLE_SSL_RECONNECT: number;
            CURLE_SSL_SHUTDOWN_FAILED: number;
            CURLE_TOO_MANY_REDIRECTS: number;
            CURLE_UNKNOWN_OPTION: number;
            CURLE_UNSUPPORTED_PROTOCOL: number;
            CURLE_UPLOAD_FAILED: number;
            CURLE_URL_MALFORMAT: number;
            CURLE_WRITE_ERROR: number;
            DAEMON_ALREADY_INITIALIZED: number;
            DAEMON_NOT_INITIALIZED: number;
            DDL_INCORRECT_VERSION: number;
            DDL_INVALID_SIGNATURE: number;
            DESCRIPTION_CONFLICT_IP_ADDRESS: number;
            DESCRIPTION_FAILED_CONNECT_AP: number;
            DESCRIPTION_FAILED_FILE_ACCESS: number;
            DESCRIPTION_INVALID: number;
            DESCRIPTION_NOT_FOUND_ACCESS_POINT: number;
            DEVICE_EULA_COUNTRY_MISMATCH: number;
            DEVICE_ID_EMPTY: number;
            DEVICE_MISMATCH: number;
            EULA_NOT_ACCEPTED: number;
            EULA_NOT_FOUND: number;
            EXCESSIVE_MAIL_SEND_REQUEST: number;
            FILE_IO_ERROR: number;
            FPD_ADD_FRIEND_PROHIBITED: number;
            FPD_BLACKLISTED_BY_ME: number;
            FPD_BLOCK_SETTING_CHANGE_NOT_ALLOWED: number;
            FPD_FRIEND_ALREADY_ADDED: number;
            FPD_FRIEND_LISTED_BY_ME: number;
            FPD_FRIEND_REQUEST_BLOCKED: number;
            FPD_INCOMPATIBLE_ACCOUNT: number;
            FPD_INVALID_ACCOUNT: number;
            FPD_INVALID_MESSAGE_ID: number;
            FPD_INVALID_PRINCIPAL_ID: number;
            FPD_INVALID_STATE: number;
            FPD_MESSAGE_IS_NOT_FOR_ME: number;
            FPD_MESSAGE_IS_NOT_MINE: number;
            FPD_MY_FRIEND_LIST_LIMIT_EXCEED: number;
            FPD_NOT_IN_MY_BLACKLIST: number;
            FPD_NOT_IN_MY_FRIEND_LIST: number;
            FPD_NOT_NETWORK_ACCOUNT: number;
            FPD_NOTIFICATION_NOT_FOUND: number;
            FPD_OPERATION_NOT_ALLOWED: number;
            FPD_REQUEST_LIMIT_EXCEED: number;
            FPD_SIZE_LIMIT_EXCEEDED: number;
            FPD_UNKNOWN: number;
            FS_STATUS_DATA_CORRUPTED: number;
            FS_STATUS_FATAL_ERROR: number;
            FS_STATUS_INVALID_MEDIA: number;
            FS_STATUS_JOURNAL_FULL: number;
            FS_STATUS_MEDIA_ERROR: number;
            FS_STATUS_MEDIA_NOT_READY: number;
            FS_STATUS_NOT_FOUND: number;
            FS_STATUS_WRITE_PROTECTED: number;
            FS_VOLSTATE_DATA_CORRUPTED: number;
            FS_VOLSTATE_DIRTY_MEDIA: number;
            FS_VOLSTATE_INITIAL: number;
            FS_VOLSTATE_INVALID_MEDIA: number;
            FS_VOLSTATE_JOURNAL_FULL: number;
            FS_VOLSTATE_MEDIA_ERROR: number;
            FS_VOLSTATE_NO_MEDIA: number;
            FS_VOLSTATE_WRITE_PROTECTED: number;
            FS_VOLSTATE_WRONG_MEDIA: number;
            GENERATE_TOKEN_FAILURE: number;
            HTTP_ABORTED_BY_CALLBACK: number;
            HTTP_AGAIN: number;
            HTTP_BAD_CONTENT_ENCODING: number;
            HTTP_BAD_DOWNLOAD_RESUME: number;
            HTTP_BAD_FUNCTION_ARGUMEN: number;
            HTTP_CHUNK_FAILED: number;
            HTTP_CONV_FAILED: number;
            HTTP_CONV_REQD: number;
            HTTP_COULDNT_CONNECT: number;
            HTTP_COULDNT_RESOLVE_HOST: number;
            HTTP_COULDNT_RESOLVE_PROXY: number;
            HTTP_FAILED_INIT: number;
            HTTP_FILE_COULDNT_READ_FILE: number;
            HTTP_FUNCTION_NOT_FOUND: number;
            HTTP_GOT_NOTHING: number;
            HTTP_HTTP_POST_ERROR: number;
            HTTP_HTTP_RETURNED_ERROR: number;
            HTTP_INTERFACE_FAILED: number;
            HTTP_NOT_BUILT_IN: number;
            HTTP_NSSL_NO_CTX: number;
            HTTP_OPERATION_TIMEDOUT: number;
            HTTP_OUT_OF_MEMORY: number;
            HTTP_PARTIAL_FILE: number;
            HTTP_PEER_FAILED_VERIFICATION: number;
            HTTP_QUOTE_ERROR: number;
            HTTP_RANGE_ERROR: number;
            HTTP_READ_ERROR: number;
            HTTP_RECV_ERROR: number;
            HTTP_REMOTE_ACCESS_DENIED: number;
            HTTP_REMOTE_FILE_NOT_FOUND: number;
            HTTP_RTSP_CSEQ_ERROR: number;
            HTTP_RTSP_SESSION_ERROR: number;
            HTTP_SEND_ERROR: number;
            HTTP_SSH: number;
            HTTP_SSL_CACERT: number;
            HTTP_SSL_CACERT_BADFILE: number;
            HTTP_SSL_CERTPROBLEM: number;
            HTTP_SSL_CIPHER: number;
            HTTP_SSL_CONNECT_ERROR: number;
            HTTP_SSL_CRL_BADFILE: number;
            HTTP_SSL_ENGINE_NOTFOUND: number;
            HTTP_SSL_ENGINE_SETFAILED: number;
            HTTP_SSL_ISSUER_ERROR: number;
            HTTP_SSL_SHUTDOWN_FAILED: number;
            HTTP_TOO_MANY_REDIRECTS: number;
            HTTP_UNKNOWN_OPTION: number;
            HTTP_UNSUPPORTED_PROTOCOL: number;
            HTTP_UPLOAD_FAILED: number;
            HTTP_URL_MALFORMAT: number;
            HTTP_WRITE_ERROR: number;
            INITIALIZATION_FAILURE: number;
            INTERNAL_SERVER_ERROR: number;
            INVALID_ACCOUNT_TOKEN: number;
            INVALID_ARGUMENT: number;
            INVALID_COUNTRY: number;
            INVALID_CREDIT_CARD_DATE: number;
            INVALID_CREDIT_CARD_NUMBER: number;
            INVALID_CREDIT_CARD_PIN: number;
            INVALID_EULA_COUNTRY: number;
            INVALID_EULA_COUNTRY_AND_VERSION: number;
            INVALID_LANGUAGE: number;
            INVALID_LOCATION: number;
            INVALID_MAC_ADDRESS: number;
            INVALID_PLATFORM_ID: number;
            INVALID_POSTAL_CODE: number;
            INVALID_REGION: number;
            INVALID_SERIAL_ID: number;
            KPAD_READ_ERR_INIT: number;
            KPAD_READ_ERR_LOCKED: number;
            KPAD_READ_ERR_NO_CONTROLLER: number;
            KPAD_READ_ERR_NO_DATA: number;
            KPAD_READ_ERR_SETUP: number;
            KPAD_WBC_ERR_CALIBRATION: number;
            KPAD_WBC_ERR_NO_BATTERY: number;
            KPAD_WBC_ERR_NO_ZEROPOINT: number;
            KPAD_WBC_ERR_SETUP: number;
            KPAD_WBC_ERR_WEIGHT_OVER: number;
            KPAD_WBC_ERR_WRONG_ZERO: number;
            MAIL_ADDRESS_NOT_ACCEPTABLE: number;
            MAIL_ADDRESS_NOT_VALIDATED: number;
            MAIL_TEXT_NOT_FOUND: number;
            MASTER_PIN_NOT_FOUND: number;
            MII_NAME_NOT_ACCEPTABLE: number;
            MII_NOT_REGISTERD: number;
            OLV_MEM_ALLOC_FAIL: number;
            OLV_INVALID_ACCOUNT: number;
            OLV_NOT_IMPLEMENTED: number;
            OLV_INIT_ERROR: number;
            OLV_INVALID_PARAM: number;
            OLV_INVALID_FORMAT: number;
            OLV_INVALID_SIZE: number;
            OLV_INVALID_POINTER: number;
            OLV_NOT_INITIALIZED: number;
            OLV_ALREADY_INITIALIZED: number;
            OLV_ALREADY_OFFLINE: number;
            OLV_NO_VALID_DATA: number;
            OLV_OPERATION_CANCELED: number;
            OLV_NO_OP_TO_CANCEL: number;
            OLV_PORTAL_APP_NOT_FOUND: number;
            OLV_TOTALLY_RESTRICTED: number;
            OLV_POSTING_RESTRICTED: number;
            OLV_SETTINGS_LOAD_FAIL: number;
            OLV_ACP_FAILED: number;
            OLV_PRELOAD_FAILED: number;
            OLV_LIB_VERSION_MISMATCH: number;
            OLV_EXPIRED: number;
            OLV_EMPTY_HTTP_RESPONSE: number;
            OLV_XML_PARSE_ERROR: number;
            OLV_DATA_NOT_ON_SERVER: number;
            OLV_DECODE_FAILED: number;
            OLV_COMMUNICATION_LIB_FAILED: number;
            OLV_LANGUAGES_UNMATCHED: number;
            OLV_CURLE_UNSUPPORTED_PROTOCOL: number;
            OLV_CURLE_FAILED_INIT: number;
            OLV_CURLE_URL_MALFORMAT: number;
            OLV_CURLE_NOT_BUILT_IN: number;
            OLV_CURLE_COULDNT_RESOLVE_PROXY: number;
            OLV_CURLE_COULDNT_RESOLVE_HOST: number;
            OLV_CURLE_COULDNT_CONNECT: number;
            OLV_CURLE_REMOTE_ACCESS_DENIED: number;
            OLV_CURLE_PARTIAL_FILE: number;
            OLV_CURLE_QUOTE_ERROR: number;
            OLV_CURLE_HTTP_RETURNED_ERROR: number;
            OLV_CURLE_WRITE_ERROR: number;
            OLV_CURLE_UPLOAD_FAILED: number;
            OLV_CURLE_READ_ERROR: number;
            OLV_CURLE_OUT_OF_MEMORY: number;
            OLV_CURLE_OPERATION_TIMEDOUT: number;
            OLV_CURLE_RANGE_ERROR: number;
            OLV_CURLE_HTTP_POST_ERROR: number;
            OLV_CURLE_SSL_CONNECT_ERROR: number;
            OLV_CURLE_BAD_DOWNLOAD_RESUME: number;
            OLV_CURLE_INTERFACE_FAILED: number;
            OLV_CURLE_TOO_MANY_REDIRECTS: number;
            OLV_CURLE_UNKNOWN_OPTION: number;
            OLV_CURLE_PEER_FAILED_VERIFICATION: number;
            OLV_CURLE_GOT_NOTHING: number;
            OLV_CURLE_SSL_ENGINE_NOTFOUND: number;
            OLV_CURLE_SSL_ENGINE_SETFAILED: number;
            OLV_CURLE_SEND_ERROR: number;
            OLV_CURLE_RECV_ERROR: number;
            OLV_CURLE_SSL_CERTPROBLEM: number;
            OLV_CURLE_SSL_CIPHER: number;
            OLV_CURLE_SSL_CACERT: number;
            OLV_CURLE_USE_SSL_FAILED: number;
            OLV_CURLE_SEND_FAIL_REWIND: number;
            OLV_CURLE_SSL_ENGINE_INITFAILED: number;
            OLV_CURLE_LOGIN_DENIED: number;
            OLV_CURLE_CONV_FAILED: number;
            OLV_CURLE_CONV_REQD: number;
            OLV_CURLE_SSL_CACERT_BADFILE: number;
            OLV_CURLE_SSL_SHUTDOWN_FAILED: number;
            OLV_CURLE_AGAIN: number;
            OLV_CURLE_SSL_CRL_BADFILE: number;
            OLV_CURLE_SSL_ISSUER_ERROR: number;
            OLV_CURLE_CHUNK_FAILED: number;
            OLV_CURLE_NSSL_NO_CTX: number;
            OLV_HTTP_UNAUTHORIZED: number;
            OLV_HTTP_FORBIDDEN: number;
            OLV_HTTP_NOT_FOUND: number;
            OLV_HTTP_TIMEOUT: number;
            OLV_HTTP_RANGE_ERROR: number;
            OLV_HTTP_SERVER_ERROR: number;
            OLV_HTTP_BAD_GATEWAY: number;
            OLV_HTTP_SERVICE_UNAVAILABLE: number;
            OLV_HTTP_GATEWAY_TIMEOUT: number;
            OLV_HTTP_VERSION_UNSUPPORTED: number;
            OLV_VERSION_UNSUPPORTED: number;
            OLV_MUST_RUN_ONCE: number;
            OLV_SERVER_DOWN: number;
            OLV_SERVICE_DISCONTINUED: number;
            OLV_PARENTAL_CONTROL_RESTRICTED: number;
            OLV_PARENTAL_CONTROL_POSTING_RESTRICTED: number;
            OLV_ACCOUNT_BANNED: number;
            OLV_ACCOUNT_BANNED_FROM_POSTING: number;
            OLV_CONSOLE_BANNED: number;
            OLV_CONSOLE_BANNED_FROM_POSTING: number;
            OLV_DIRECT_MESSAGE_FAIL: number;
            OLV_INVALID_SERVICE_TOKEN: number;
            OLV_MISSING_PARAMETER: number;
            OLV_INVALID_PARAMETER_TYPE: number;
            OLV_ATTACHMENT_TOO_LARGE: number;
            OLV_PARAMETER_OUT_OF_BOUNDS: number;
            OLV_INVALID_REQUEST: number;
            OLV_ACCESS_KEY_MISMATCH: number;
            OLV_RECIPIENT_NOT_FRIEND: number;
            OLV_COMMUNITY_NONEXIST: number;
            OLV_TITLE_NONEXIST: number;
            OLV_INAPPROPRIATE_LANGUAGE: number;
            NETWORK_CLOCK_INVALID: number;
            NEX_ACCOUNT_NOT_FOUND: number;
            NINTENDO_NETWORK_CLOSED: number;
            NOT_CONNECTED: number;
            NOT_LOCAL_ACCOUNT: number;
            NOT_NETWORK_ACCOUNT: number;
            NOT_PROVIDED_COUNTRY: number;
            OPEN_SSL_AKID_ISSUER_SERIAL_MISMATCH: number;
            OPEN_SSL_AKID_SKID_MISMATCH: number;
            OPEN_SSL_APPLICATION_VERIFICATION: number;
            OPEN_SSL_CERT_CHAIN_TOO_LONG: number;
            OPEN_SSL_CERT_HAS_EXPIRED: number;
            OPEN_SSL_CERT_NOT_YET_VALID: number;
            OPEN_SSL_CERT_REJECTED: number;
            OPEN_SSL_CERT_REVOKED: number;
            OPEN_SSL_CERT_SIGNATURE_FAILURE: number;
            OPEN_SSL_CERT_UNTRUSTED: number;
            OPEN_SSL_CRL_HAS_EXPIRED: number;
            OPEN_SSL_CRL_NOT_YET_VALID: number;
            OPEN_SSL_CRL_PATH_VALIDATION_ERROR: number;
            OPEN_SSL_CRL_SIGNATURE_FAILURE: number;
            OPEN_SSL_DEPTH_ZERO_SELF_SIGNED_CERT: number;
            OPEN_SSL_DIFFERENT_CRL_SCOPE: number;
            OPEN_SSL_ERROR_IN_CERT_NOT_AFTER_FIELD: number;
            OPEN_SSL_ERROR_IN_CERT_NOT_BEFORE_FIELD: number;
            OPEN_SSL_ERROR_IN_CRL_LAST_UPDATE_FIELD: number;
            OPEN_SSL_ERROR_IN_CRL_NEXT_UPDATE_FIELD: number;
            OPEN_SSL_EXCLUDED_VIOLATION: number;
            OPEN_SSL_ILLEGAL: number;
            OPEN_SSL_INVALID_CA: number;
            OPEN_SSL_INVALID_EXTENSION: number;
            OPEN_SSL_INVALID_NON_CA: number;
            OPEN_SSL_INVALID_POLICY_EXTENSION: number;
            OPEN_SSL_INVALID_PURPOSE: number;
            OPEN_SSL_KEYUSAGE_NO_CERTSIGN: number;
            OPEN_SSL_KEYUSAGE_NO_CRL_SIGN: number;
            OPEN_SSL_KEYUSAGE_NO_DIGITAL_SIGNATURE: number;
            OPEN_SSL_NO_EXPLICIT_POLICY: number;
            OPEN_SSL_OUT_OF_MEM: number;
            OPEN_SSL_PATH_LENGTH_EXCEEDED: number;
            OPEN_SSL_PERMITTED_VIOLATION: number;
            OPEN_SSL_PROXY_CERTIFICATES_NOT_ALLOWED: number;
            OPEN_SSL_PROXY_PATH_LENGTH_EXCEEDED: number;
            OPEN_SSL_SELF_SIGNED_CERT_IN_CHAIN: number;
            OPEN_SSL_SUBJECT_ISSUER_MISMATCH: number;
            OPEN_SSL_SUBTREE_MINMAX: number;
            OPEN_SSL_UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY: number;
            OPEN_SSL_UNABLE_TO_DECRYPT_CERT_SIGNATURE: number;
            OPEN_SSL_UNABLE_TO_DECRYPT_CRL_SIGNATURE: number;
            OPEN_SSL_UNABLE_TO_GET_CRL: number;
            OPEN_SSL_UNABLE_TO_GET_CRL_ISSUER: number;
            OPEN_SSL_UNABLE_TO_GET_ISSUER_CERT: number;
            OPEN_SSL_UNABLE_TO_GET_ISSUER_CERT_LOCALLY: number;
            OPEN_SSL_UNABLE_TO_VERIFY_LEAF_SIGNATURE: number;
            OPEN_SSL_UNHANDLED_CRITICAL_CRL_EXTENSION: number;
            OPEN_SSL_UNHANDLED_CRITICAL_EXTENSION: number;
            OPEN_SSL_UNNESTED_RESOURCE: number;
            OPEN_SSL_UNSUPPORTED_CONSTRAINT_SYNTAX: number;
            OPEN_SSL_UNSUPPORTED_CONSTRAINT_TYPE: number;
            OPEN_SSL_UNSUPPORTED_EXTENSION_FEATURE: number;
            OPEN_SSL_UNSUPPORTED_NAME_SYNTAX: number;
            OUT_OF_MEMORY: number;
            PARENTAL_CONTROLS_REQUIRED: number;
            PID_NOT_FOUND: number;
            PLATFORM_ID_EMPTY: number;
            PYTHONCORE_CALL_FAILURE: number;
            PYTHONCORE_CONVERSION_ERROR: number;
            PYTHONCORE_EXCEPTION: number;
            PYTHONCORE_INDEX_ERROR: number;
            PYTHONCORE_INVALID_REFERENCE: number;
            PYTHONCORE_KEY_ERROR: number;
            PYTHONCORE_MEMORY_ERROR: number;
            PYTHONCORE_OPERATION_ERROR: number;
            PYTHONCORE_TYPE_ERROR: number;
            PYTHONCORE_VALIDATION_ERROR: number;
            REACHED_ASSOCIATION_LIMIT: number;
            REACHED_REGISTRATION_LIMIT: number;
            RENDEZVOUS_ACCOUNT_DISABLED: number;
            RENDEZVOUS_ACCOUNT_EXPIRED: number;
            RENDEZVOUS_CLASS_NOT_FOUND: number;
            RENDEZVOUS_CONCURRENT_LOGIN_DENIED: number;
            RENDEZVOUS_CONNECTION_FAILURE: number;
            RENDEZVOUS_CONTROL_SCRIPT_FAILURE: number;
            RENDEZVOUS_DDL_MISMATCH: number;
            RENDEZVOUS_DUPLICATE_ENTRY: number;
            RENDEZVOUS_ENCRYPTION_FAILURE: number;
            RENDEZVOUS_INVALID_GID: number;
            RENDEZVOUS_INVALID_OPERATION_IN_LIVE_ENVIRONMENT: number;
            RENDEZVOUS_INVALID_PASSWORD: number;
            RENDEZVOUS_INVALID_PID: number;
            RENDEZVOUS_INVALID_THREAD_ID: number;
            RENDEZVOUS_INVALID_USERNAME: number;
            RENDEZVOUS_MAX_CONNECTIONS_REACHED: number;
            RENDEZVOUS_NOT_AUTHENTICATED: number;
            RENDEZVOUS_USERNAME_ALREADY_EXISTS: number;
            REQUEST_FORBIDDEN: number;
            REQUEST_NOT_FOUND: number;
            REQUEST_PARAMETER_MISSING: number;
            RESPONSE_ITEM_MISSING: number;
            RESPONSE_TOO_LARGE: number;
            RESTRICTED_BY_AGE: number;
            RMC_FAILED: number;
            SAVE_STATUS_STORAGE_FULL: number;
            SEND_MAIL_FAILURE: number;
            SERIAL_ID_EMPTY: number;
            INVALID_UNIQUE_ID: number;
            INVALID_CLIENT_ID: number;
            INVALID_CLIENT_KEY: number;
            INVALID_NEX_CLIENT_ID: number;
            INVALID_GAME_SERVER_ID: number;
            GAME_SERVER_ID_ENVIRONMENT_NOT_FOUND: number;
            GAME_SERVER_ID_UNIQUE_ID_NOT_LINKED: number;
            CLIENT_ID_UNIQUE_ID_NOT_LINKED: number;
            SERVICE_CLOSED: number;
            SLOTS_FULL: number;
            SO_SELECT_ERROR: number;
            SYSTEM_UPDATE_REQUIRED: number;
            TRANSPORT_CONGESTED_END_POINT: number;
            TRANSPORT_CONNECTION_FAILURE: number;
            TRANSPORT_CONNECTION_RESET: number;
            TRANSPORT_DATA_REMAINING: number;
            TRANSPORT_DECOMPRESSION_FAILURE: number;
            TRANSPORT_DNS_ERROR: number;
            TRANSPORT_DUPLICATE_ENDPOINT: number;
            TRANSPORT_INCORRECT_REMOTE_AUTHENTICATION: number;
            TRANSPORT_INVALID_KEY: number;
            TRANSPORT_INVALID_URL: number;
            TRANSPORT_INVALID_URL_TYPE: number;
            TRANSPORT_IO_ERROR: number;
            TRANSPORT_NO_BUFFER: number;
            TRANSPORT_NOT_FOUND: number;
            TRANSPORT_PROXY_ERROR: number;
            TRANSPORT_SERVER_REQUEST_ERROR: number;
            TRANSPORT_SOCKET_SEND_WARNING: number;
            TRANSPORT_TIMEOUT: number;
            TRANSPORT_UNKNOWN: number;
            TRANSPORT_UNSUPPORTED_NAT: number;
            UNAUTHORIZED_CLIENT: number;
            UNAUTHORIZED_DEVIC: number;
            UNDER_MAINTENANCE: number;
            VPAD_READ_ERR_NO_CONTROLLER: number;
            WEBKIT_ADDRESS_BLOCKED_BY_WHITELIST: number;
            WEBKIT_ASSET_LOAD_FAIL: number;
            WEBKIT_EXTENSION_RPL_NOT_FOUND: number;
            WEBKIT_INIT_ERROR: number;
            WEBKIT_INVALID_CONFIG_XML: number;
            WEBKIT_JAVASCRIPT_EXEC_TIMEOUT: number;
            WEBKIT_JAVASCRIPT_OUT_OF_MEMORY: number;
            WEBKIT_LIBRARY_ALREADY_INIT: number;
            WEBKIT_LIBRARY_UNINIT: number;
            WEBKIT_MALFORMATTED_HTML: number;
            WEBKIT_MEM_ALLOC_FAIL: number;
            WEBKIT_NETWORK_BAD_GATEWAY: number;
            WEBKIT_NETWORK_CONFLICT: number;
            WEBKIT_NETWORK_EXPECTATION_FAILED: number;
            WEBKIT_NETWORK_FORBIDDEN: number;
            WEBKIT_NETWORK_GATEWAY_TIMEOUT: number;
            WEBKIT_NETWORK_GONE: number;
            WEBKIT_NETWORK_HTTP_VERSION_UNSUPPORTED: number;
            WEBKIT_NETWORK_INTERNAL_SERVER_ERROR: number;
            WEBKIT_NETWORK_LENGTH_REQUIRED: number;
            WEBKIT_NETWORK_METHOD_NOT_ALLOWED: number;
            WEBKIT_NETWORK_NOT_ACCEPTABLE: number;
            WEBKIT_NETWORK_NOT_FOUND: number;
            WEBKIT_NETWORK_NOT_IMPLEMENTED: number;
            WEBKIT_NETWORK_PAYMENT_REQUIRED: number;
            WEBKIT_NETWORK_PRECONDITION_FAILED: number;
            WEBKIT_NETWORK_PROXY_AUTH_REQ: number;
            WEBKIT_NETWORK_RANGE_NOT_SATISFIABLE: number;
            WEBKIT_NETWORK_REQUEST_ENTITY_TOO_LARGE: number;
            WEBKIT_NETWORK_REQUEST_TIMEOUT: number;
            WEBKIT_NETWORK_REQUEST_URI_TOO_LONG: number;
            WEBKIT_NETWORK_SERVICE_UNAVAILABLE: number;
            WEBKIT_NETWORK_UNAUTHORIZED: number;
            WEBKIT_NETWORK_UNSUPPORTED_MEDIA_TYPE: number;
            WEBKIT_RESERVED: number;
            WEBKIT_SAVE_DATA_FULL: number;
            WEBKIT_SAVE_DATA_FULL_REQUIRED: number;
            WEBKIT_THREAD_EXEC_TIMEOUT: number;
            WEBKIT_UNSUPPORTED_AUDIO_FORMAT: number;
            WEBKIT_UNSUPPORTED_IMAGE_FORMAT: number;
            WEBKIT_UNSUPPORTED_VIDEO_FORMAT: number;
            WEBKIT_WEBKIT_OUT_OF_MEMORY: number;
            WPAD_ERR_BROKEN: number;
            WPAD_ERR_BUSY: number;
            WPAD_ERR_CORRUPTED: number;
            WPAD_ERR_INVALID: number;
            WPAD_ERR_NO_CONTROLLER: number;
            WPAD_ERR_NOPERM: number;
            WPAD_ERR_TRANSFER: number;
            WRONG_ACCOUNT_MAIL: number;
            WRONG_ACCOUNT_PASSWORD: number;
            WRONG_ACCOUNT_PASSWORD_OR_MAIL_ADDRESS: number;
            WRONG_BIRTH_DATE_OR_MAIL_ADDRESS: number;
            WRONG_CONFIRMATION_CODE: number;
            WRONG_HTTP_METHOD: number;
            WRONG_MAIL_ADDRESS: number;
            NEX_DESCRIPTION_CORE_UNKNOWN: number;
            NEX_DESCRIPTION_CORE_NOT_IMPLEMENTED: number;
            NEX_DESCRIPTION_CORE_INVALID_POINTER: number;
            NEX_DESCRIPTION_CORE_OPERATION_ABORTED: number;
            NEX_DESCRIPTION_CORE_EXCEPTION: number;
            NEX_DESCRIPTION_CORE_ACCESS_DENIED: number;
            NEX_DESCRIPTION_CORE_INVALID_HANDLE: number;
            NEX_DESCRIPTION_CORE_INVALID_INDEX: number;
            NEX_DESCRIPTION_CORE_OUT_OF_MEMORY: number;
            NEX_DESCRIPTION_CORE_INVALID_ARGUMENT: number;
            NEX_DESCRIPTION_CORE_TIMEOUT: number;
            NEX_DESCRIPTION_CORE_INITIALIZATION_FAILURE: number;
            NEX_DESCRIPTION_CORE_CALL_INITIATION_FAILURE: number;
            NEX_DESCRIPTION_CORE_REGISTRATION_ERROR: number;
            NEX_DESCRIPTION_CORE_BUFFER_OVERFLOW: number;
            NEX_DESCRIPTION_CORE_INVALID_LOCK_STATE: number;
            NEX_DESCRIPTION_DDL_INVALID_SIGNATURE: number;
            NEX_DESCRIPTION_DDL_INCORRECT_VERSION: number;
            NEX_DESCRIPTION_RENDEZVOUS_CONNECTION_FAILURE: number;
            NEX_DESCRIPTION_RENDEZVOUS_NOT_AUTHENTICATED: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_USERNAME: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_PASSWORD: number;
            NEX_DESCRIPTION_RENDEZVOUS_USERNAME_ALREADY_EXISTS: number;
            NEX_DESCRIPTION_RENDEZVOUS_ACCOUNT_DISABLED: number;
            NEX_DESCRIPTION_RENDEZVOUS_ACCOUNT_EXPIRED: number;
            NEX_DESCRIPTION_RENDEZVOUS_CONCURRENT_LOGIN_DENIED: number;
            NEX_DESCRIPTION_RENDEZVOUS_ENCRYPTION_FAILURE: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_PID: number;
            NEX_DESCRIPTION_RENDEZVOUS_MAX_CONNECTIONS_REACHED: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_GID: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_THREAD_ID: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_OPERATION_IN_LIVE_ENVIRONMENT: number;
            NEX_DESCRIPTION_RENDEZVOUS_DUPLICATE_ENTRY: number;
            NEX_DESCRIPTION_RENDEZVOUS_CONTROL_SCRIPT_FAILURE: number;
            NEX_DESCRIPTION_RENDEZVOUS_CLASS_NOT_FOUND: number;
            NEX_DESCRIPTION_RENDEZVOUS_SESSION_VOID: number;
            NEX_DESCRIPTION_RENDEZVOUS_LSP_GATEWAY_UNREACHABLE: number;
            NEX_DESCRIPTION_RENDEZVOUS_DDL_MISMATCH: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_FTP_INFO: number;
            NEX_DESCRIPTION_RENDEZVOUS_SESSION_FULL: number;
            NEX_DESCRIPTION_RENDEZVOUS_INVALID_GATHERING_PASSWORD: number;
            NEX_DESCRIPTION_RENDEZVOUS_WITHOUT_PARTICIPATION_PERIOD: number;
            NEX_DESCRIPTION_RENDEZVOUS_COMMUNITY_CREATION_MAX: number;
            NEX_DESCRIPTION_RENDEZVOUS_COMMUNITY_PARTICIPATION_MAX: number;
            NEX_DESCRIPTION_RENDEZVOUS_DENIED_BY_PARTICIPANTS: number;
            NEX_DESCRIPTION_RENDEZVOUS_PARTICIPANT_IN_BLACKLIST: number;
            NEX_DESCRIPTION_PYTHONCORE_EXCEPTION: number;
            NEX_DESCRIPTION_PYTHONCORE_TYPE_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_INDEX_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_INVALID_REFERENCE: number;
            NEX_DESCRIPTION_PYTHONCORE_CALL_FAILURE: number;
            NEX_DESCRIPTION_PYTHONCORE_MEMORY_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_KEY_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_OPERATION_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_CONVERSION_ERROR: number;
            NEX_DESCRIPTION_PYTHONCORE_VALIDATION_ERROR: number;
            NEX_DESCRIPTION_TRANSPORT_UNKNOWN: number;
            NEX_DESCRIPTION_TRANSPORT_CONNECTION_FAILURE: number;
            NEX_DESCRIPTION_TRANSPORT_INVALID_URL: number;
            NEX_DESCRIPTION_TRANSPORT_INVALID_KEY: number;
            NEX_DESCRIPTION_TRANSPORT_INVALID_URL_TYPE: number;
            NEX_DESCRIPTION_TRANSPORT_IO_ERROR: number;
            NEX_DESCRIPTION_TRANSPORT_TIMEOUT: number;
            NEX_DESCRIPTION_TRANSPORT_INCORRECT_REMOTE_AUTHENTICATION: number;
            NEX_DESCRIPTION_TRANSPORT_SERVER_REQUEST_ERROR: number;
            NEX_DESCRIPTION_TRANSPORT_CONGESTED_END_POINT: number;
            NEX_DESCRIPTION_TRANSPORT_SOCKET_OVERFLOW: number;
            NEX_DESCRIPTION_TRANSPORT_UNSUPPORTED_NAT: number;
            NEX_DESCRIPTION_TRANSPORT_DNS_RESOLUTION_FAIL: number;
            NEX_DESCRIPTION_TRANSPORT_PROXY_FAIL: number;
            NEX_DESCRIPTION_TRANSPORT_BUFFER_LEFTOVER: number;
            NEX_DESCRIPTION_TRANSPORT_BUFFER_FULL: number;
            NEX_DESCRIPTION_TRANSPORT_RESOURCE_NOT_FOUND: number;
            NEX_DESCRIPTION_TRANSPORT_TEMP_SERVER_ERROR: number;
            NEX_DESCRIPTION_TRANSPORT_PERM_SERVER_ERROR: number;
            NEX_DESCRIPTION_TRANSPORT_SERVER_MAINTENANCE: number;
            NEX_DESCRIPTION_TRANSPORT_SEND_BUFFER_FULL: number;
            NEX_DESCRIPTION_TRANSPORT_INVALID_STATION: number;
            NEX_DESCRIPTION_DOCORE_STATION_NOT_REACHED: number;
            NEX_DESCRIPTION_DOCORE_TARGET_STATION_DISCONNECT: number;
            NEX_DESCRIPTION_DOCORE_LOCAL_STATION_LEAVING: number;
            NEX_DESCRIPTION_DOCORE_OBJECT_NOT_FOUND: number;
            NEX_DESCRIPTION_DOCORE_INVALID_ROLE: number;
            NEX_DESCRIPTION_DOCORE_CALL_TIMEOUT: number;
            NEX_DESCRIPTION_DOCORE_RMC_DISPATCH_FAILED: number;
            NEX_DESCRIPTION_DOCORE_MIGRATION_IN_PROGRESS: number;
            NEX_DESCRIPTION_DOCORE_NO_AUTHORITY: number;
            NEX_DESCRIPTION_DOCORE_NO_TARGET_STATION_SPECIFIED: number;
            NEX_DESCRIPTION_DOCORE_JOIN_FAILED: number;
            NEX_DESCRIPTION_DOCORE_JOIN_DENIED: number;
            NEX_DESCRIPTION_DOCORE_CONNECTIVITY_TEST_FAILED: number;
            NEX_DESCRIPTION_DOCORE_UNKNOWN: number;
            NEX_DESCRIPTION_DOCORE_UNFREED_REFERENCES: number;
            NEX_DESCRIPTION_DOCORE_JOB_TERMINATION_FAILED: number;
            NEX_DESCRIPTION_DOCORE_INVALID_STATE: number;
            NEX_DESCRIPTION_DOCORE_FAULT_RECOVERY_FATAL: number;
            NEX_DESCRIPTION_DOCORE_FAULT_RECOVERY_JOB_STATUS_FAIL: number;
            NEX_DESCRIPTION_DOCORE_STATION_INCONSISTENCY: number;
            NEX_DESCRIPTION_DOCORE_ABNORMAL_MASTER_STATE: number;
            NEX_DESCRIPTION_DOCORE_VERSION_MISMATCH: number;
            NEX_DESCRIPTION_FPD_NOT_INITIALIZED: number;
            NEX_DESCRIPTION_FILE_IO_ERROR: number;
            NEX_DESCRIPTION_AUTHENTICATION_NAS_AUTHENTICATE_ERROR: number;
            NEX_DESCRIPTION_AUTHENTICATION_TOKEN_PARSE_ERROR: number;
            NEX_DESCRIPTION_AUTHENTICATION_HTTP_CONNECTION_ERROR: number;
            NEX_DESCRIPTION_AUTHENTICATION_HTTP_DNS_ERROR: number;
            NEX_DESCRIPTION_AUTHENTICATION_HTTP_GET_PROXY_SETTING: number;
            NEX_DESCRIPTION_AUTHENTICATION_TOKEN_EXPIRED: number;
            NEX_DESCRIPTION_AUTHENTICATION_VALIDATION_FAILED: number;
            NEX_DESCRIPTION_AUTHENTICATION_INVALID_PARAM: number;
            NEX_DESCRIPTION_AUTHENTICATION_PRINCIPAL_ID_UNMATCHED: number;
            NEX_DESCRIPTION_AUTHENTICATION_MOVE_COUNT_UNMATCH: number;
            NEX_DESCRIPTION_AUTHENTICATION_UNDER_MAINTENANCE: number;
            NEX_DESCRIPTION_AUTHENTICATION_UNSUPPORTED_VERSION: number;
            NEX_DESCRIPTION_AUTHENTICATION_SERVER_VERSION_IS_OLD: number;
            NEX_SYSTEMERROR_FACADE_NOT_INITIALIZED: number;
            NEX_SYSTEMERROR_GEN_NOT_ENOUGH_MEM: number;
            NEX_SYSTEMERROR_GEN_ILLEGAL_ACCESS: number;
            NEX_SYSTEMERROR_GEN_WIN32_ERROR: number;
            NEX_SYSTEMERROR_GEN_INDEX_OOB: number;
            NEX_SYSTEMERROR_GEN_DUPLICATED_KEY: number;
            NEX_SYSTEMERROR_GEN_ITEM_NOT_DELETED: number;
            NEX_SYSTEMERROR_GEN_ITEM_NOT_FOUND: number;
            NEX_SYSTEMERROR_GEN_END_OF_COLLECTION: number;
            NEX_SYSTEMERROR_GEN_OBJ_NOT_INIT: number;
            NEX_SYSTEMERROR_GEN_NOT_IMPLEMENTED: number;
            NEX_SYSTEMERROR_GEN_OUT_OF_ID: number;
            NEX_SYSTEMERROR_GEN_INTERNAL: number;
            NEX_SYSTEMERROR_GEN_TIMEOUT: number;
            NEX_SYSTEMERROR_GEN_CHILDPROCESS_FAILED: number;
            NEX_SYSTEMERROR_GEN_INVALID_OPERATION: number;
            NEX_SYSTEMERROR_GEN_MULTIPLE_INSTANCES: number;
            NEX_SYSTEMERROR_GEN_MULTIPLE_EXCEPTION_HANDLER: number;
            NEX_SYSTEMERROR_GEN_EXPIRED: number;
            NEX_SYSTEMERROR_GEN_OUT_OF_RANGE: number;
            NEX_SYSTEMERROR_GEN_ASSERTION_FAILED: number;
            NEX_SYSTEMERROR_GEN_DEADLOCK_DETECTED: number;
            NEX_SYSTEMERROR_GEN_NOT_INITIALIZED: number;
            NEX_SYSTEMERROR_GEN_INVALID_PARAMETER: number;
            NEX_SYSTEMERROR_GEN_IO_ERROR: number;
            NEX_SYSTEMERROR_GEN_INVALID_PRODUCT_KEY: number;
            NEX_SYSTEMERROR_GEN_BUFFER_EXTRACTION_OVERFLOW: number;
            NEX_SYSTEMERROR_GEN_INVALID_WAIT: number;
            NEX_SYSTEMERROR_GEN_ACCESS_DENIED: number;
            NEX_SYSTEMERROR_GEN_OP_DENIED: number;
            NEX_SYSTEMERROR_GEN_INVALID_OPERATION_WARNING: number;
            NEX_SYSTEMERROR_TRANSPORT_SOCKET_SEND_WARNING: number;
            NEX_SYSTEMERROR_OBJDUP_INVALID_ON_DUPLICA: number;
            NEX_SYSTEMERROR_OBJDUP_INVALID_ON_MASTER: number;
            NEX_SYSTEMERROR_OBJDUP_INVALID_PROPERTY_TRANSITION: number;
            NEX_SYSTEMERROR_OBJDUP_UNDEFINED_CALLBACK: number;
            NEX_SYSTEMERROR_OBJDUP_DO_NOT_FOUND: number;
            NEX_SYSTEMERROR_OBJDUP_INVALID_PARAMETER: number;
            NEX_SYSTEMERROR_OBJDUP_CANNOT_EMIGRATE: number;
            NEX_SYSTEMERROR_OBJDUP_INVALID_CONSTRUCTION: number;
            NEX_SYSTEMERROR_OBJDUP_ALREADY_PUBLISHED: number;
            NEX_SYSTEMERROR_MISSING_DATASET_CALLBACK: number;
            NEX_SYSTEMERROR_OBJDUP_WKHANDLE_NOT_INITIALIZED: number;
            NEX_SYSTEMERROR_OBJDUP_WKHANDLE_WERE_CREATED: number;
            NEX_SYSTEMERROR_OBJDUP_MISMATCHED_DOCLASS: number;
            NEX_SYSTEMERROR_OBJDUP_WKHANDLE_EXISTS: number;
            NEX_SYSTEMERROR_OBJDUP_CANNOT_PUBLISH: number;
            NEX_SYSTEMERROR_OBJDUP_STATION_NOT_FOUND: number;
            NEX_SYSTEMERROR_DC_CLUSTER_REDEFINITION: number;
            NEX_SYSTEMERROR_DC_CLUSTER_JOIN_DENIED: number;
            NEX_SYSTEMERROR_DC_CLUSTER_JOIN_FAILED: number;
            NEX_SYSTEMERROR_DC_MISMATCHED_BARRIER_ID: number;
            NEX_SYSTEMERROR_DC_BARRIER_TIMEOUT: number;
            NEX_SYSTEMERROR_DC_CLUSTER_NOT_INITIALIZED: number;
            NEX_SYSTEMERROR_DC_NOT_CLUSTER_MASTER: number;
            NEX_SYSTEMERROR_DC_INVALID_STATE_TRANSITION: number;
            NEX_SYSTEMERROR_DC_CLUSTER_ALREADY_INITIALIZED: number;
            NEX_SYSTEMERROR_OBJDUP_TRANSPORT_NOT_FOUND: number;
            NEX_SYSTEMERROR_OBJDUP_RELIABLE_SEND_WARNING: number;
            NEX_DESCRIPTION_OUT_OF_BOUNDARY: number;
            NEX_DESCRIPTION_DUPLICATED_KEY: number;
            NEX_DESCRIPTION_ITEM_NOT_FOUND: number;
            NEX_DESCRIPTION_END_OF_COLLECTION: number;
            NEX_DESCRIPTION_OBJ_NOT_INIT: number;
            NEX_DESCRIPTION_NOT_IMPLEMENTED: number;
            NEX_DESCRIPTION_TIMEOUT: number;
            NEX_DESCRIPTION_INVALID_OPERATION: number;
            NEX_DESCRIPTION_MULTIPLE_INSTANCES: number;
            NEX_DESCRIPTION_OUT_OF_RANGE: number;
            NEX_DESCRIPTION_INVALID_PARAMETER: number;
            NEX_DESCRIPTION_BUFFER_EXTRACTION_OVERFLOW: number;
            NEX_DESCRIPTION_INVALID_WAIT: number;
            NEX_DESCRIPTION_ACCESS_DENIED: number;
            NEX_DESCRIPTION_ROLE_MISMATCH: number;
            NEX_DESCRIPTION_INVALID_OPERATION_WARNING: number;
            NEX_DESCRIPTION_RELIEABLE_SEND_WARNING: number;
            NEX_DESCRIPTION_OBJDUP_DO_NOT_FOUND: number;
            NEX_DESCRIPTION_OUT_OF_MEMORY: number;
            NEX_DESCRIPTION_SOCKET_SEND_WARNING: number;
            NEX_DESCRIPTION_INVALID_NEW_STATION: number;
            NEX_DESCRIPTION_RANKING_NOT_INITIALIZED: number;
            NEX_DESCRIPTION_RANKING_INVALID_ARGUMENT: number;
            NEX_DESCRIPTION_RANKING_REGISTRATION_ERROR: number;
            NEX_DESCRIPTION_RANKING_NOT_FOUND: number;
            NEX_DESCRIPTION_RANKING_INVALID_SCORE: number;
            NEX_DESCRIPTION_RANKING_INVALID_DATA_SIZE: number;
            NEX_DESCRIPTION_RANKING_PERMISSION_DENIED: number;
            NEX_DESCRIPTION_RANKING_UNKNOWN: number;
            NEX_DESCRIPTION_RANKING_NOT_IMPLEMENTED: number;
            NEX_DATA_STORE_UNKNOWN_ERROR: number;
            NEX_DATA_STORE_INVALID_ARGUMENT: number;
            NEX_DATA_STORE_NO_ACCESS_RIGHTS: number;
            NEX_DATA_STORE_ID_NOT_FOUND: number;
            NEX_DATA_STORE_OBJECT_UNDER_REVIEW: number;
            NEX_DATA_STORE_OBJECT_EXPIRED: number;
            NEX_DATA_STORE_INVALID_CHECK_TOKEN: number;
            NEX_DATA_STORE_SYS_FILE_LOAD_FAIL: number;
            NEX_DATA_STORE_BATCH_PROCESS_COUNT_EXCEEDED: number;
            NEX_DATA_STORE_OPERATION_NOT_ALLOWED: number;
            NEX_DATA_STORE_VALUE_DOES_NOT_MATCH: number;
            RESTRICTED_BY_PARENTAL_CONTROL: number;
            ECOMMERCE_ALREADY_INITIALIZED: number;
            ECOMMERCE_APPLET_ACP_ERROR: number;
            ECOMMERCE_APPLET_BALANCE_EXCEED_MAX_CASH: number;
            ECOMMERCE_APPLET_BALANCE_NO_ADD_METHOD: number;
            ECOMMERCE_APPLET_CC_INVALID_CARD: number;
            ECOMMERCE_APPLET_CC_PASSWORD_IS_SAME_STRING: number;
            ECOMMERCE_APPLET_CC_TWO_PASSWORD_NOT_MATCH: number;
            ECOMMERCE_APPLET_CONTENT_ALREADY_INSTALLED: number;
            ECOMMERCE_APPLET_DATATITLE_CANNOT_LOCK: number;
            ECOMMERCE_APPLET_ERROR_CODE_REDEEMABLE_ITEM_WRONG_PAIR: number;
            ECOMMERCE_APPLET_EXCEED_MAX_CASH: number;
            ECOMMERCE_APPLET_FS_NOT_FOUND: number;
            ECOMMERCE_APPLET_FS_PERMISSION_ERROR: number;
            ECOMMERCE_APPLET_FS_UNKNOWN: number;
            ECOMMERCE_APPLET_NEEDS_NETWORK_UPDATE: number;
            ECOMMERCE_APPLET_NFC_DRC_NOT_CONNECTED: number;
            ECOMMERCE_APPLET_NFC_GW_SERVER_NETWORK_ERROR: number;
            ECOMMERCE_APPLET_NFC_GW_SERVER_UNDER_MAINTENANCE: number;
            ECOMMERCE_APPLET_NFC_INITIALIZE_FAILED: number;
            ECOMMERCE_APPLET_NFC_REQUEST_FAILED: number;
            ECOMMERCE_APPLET_REDEEMABLE_ITEM_ALREADY_HAVE_RIGHT: number;
            ECOMMERCE_APPLET_REDEEMABLE_ITEM_NOT_FOUND: number;
            ECOMMERCE_APPLET_REDEEMABLE_ITEM_TOO_MANY: number;
            ECOMMERCE_APPLET_SPM_EXT_STORAGE_NOT_RESOLVED: number;
            ECOMMERCE_APPLET_SPM_GET_STORAGEINFO_FAILE: number;
            ECOMMERCE_APPLET_STORAGE_FULL: number;
            ECOMMERCE_APPLET_TASK_IS_FULL: number;
            ECOMMERCE_APPLET_TASK_MUST_FINISH_INSTALL: number;
            ECOMMERCE_APPLET_TASK_STATE_ERROR: number;
            ECOMMERCE_APPLET_TASK_VERSION_OLD: number;
            ECOMMERCE_APPLET_UPDATE_DATATITLE_NONE: number;
            ECOMMERCE_APPLET_UPDATE_DATATITLE_TASK_VERSION_OLD: number;
            ECOMMERCE_APPLET_UPDATE_DATATITLE_TOO_MANY_UPDATES: number;
            ECOMMERCE_APPLET_VCTL_UNKNOWN: number;
            ECOMMERCE_CANCELED: number;
            ECOMMERCE_CASH_DOWNLOAD_CODE: number;
            ECOMMERCE_CURL_ABORTED_BY_CALLBACK: number;
            ECOMMERCE_CURL_AGAIN: number;
            ECOMMERCE_CURL_BAD_CONTENT_ENCODING: number;
            ECOMMERCE_CURL_BAD_DOWNLOAD_RESUME: number;
            ECOMMERCE_CURL_BAD_FUNCTION_ARGUMENT: number;
            ECOMMERCE_CURL_CHUNK_FAILED: number;
            ECOMMERCE_CURL_CONV_FAILED: number;
            ECOMMERCE_CURL_CONV_REQD: number;
            ECOMMERCE_CURL_COULDNT_CONNECT: number;
            ECOMMERCE_CURL_COULDNT_RESOLVE_HOST: number;
            ECOMMERCE_CURL_COULDNT_RESOLVE_PROXY: number;
            ECOMMERCE_CURL_FAILED_INIT: number;
            ECOMMERCE_CURL_FILE_COULDNT_READ_FILE: number;
            ECOMMERCE_CURL_FUNCTION_NOT_FOUND: number;
            ECOMMERCE_CURL_GOT_NOTHING: number;
            ECOMMERCE_CURL_HTTP_POST_ERROR: number;
            ECOMMERCE_CURL_HTTP_RETURNED_ERROR: number;
            ECOMMERCE_CURL_INTERFACE_FAILED: number;
            ECOMMERCE_CURL_NOT_BUILT_IN: number;
            ECOMMERCE_CURL_NSSL_NO_CTX: number;
            ECOMMERCE_CURL_OPERATION_TIMEDOUT: number;
            ECOMMERCE_CURL_OUT_OF_MEMORY: number;
            ECOMMERCE_CURL_PARTIAL_FILE: number;
            ECOMMERCE_CURL_PEER_FAILED_VERIFICATION: number;
            ECOMMERCE_CURL_QUOTE_ERROR: number;
            ECOMMERCE_CURL_RANGE_ERROR: number;
            ECOMMERCE_CURL_READ_ERROR: number;
            ECOMMERCE_CURL_RECV_ERROR: number;
            ECOMMERCE_CURL_REMOTE_ACCESS_DENIED: number;
            ECOMMERCE_CURL_REMOTE_FILE_NOT_FOUND: number;
            ECOMMERCE_CURL_RTSP_CSEQ_ERROR: number;
            ECOMMERCE_CURL_RTSP_SESSION_ERROR: number;
            ECOMMERCE_CURL_SEND_ERROR: number;
            ECOMMERCE_CURL_SSH: number;
            ECOMMERCE_CURL_SSL_CACERT: number;
            ECOMMERCE_CURL_SSL_CACERT_BADFILE: number;
            ECOMMERCE_CURL_SSL_CERTPROBLEM: number;
            ECOMMERCE_CURL_SSL_CIPHER: number;
            ECOMMERCE_CURL_SSL_CONNECT_ERROR: number;
            ECOMMERCE_CURL_SSL_CRL_BADFILE: number;
            ECOMMERCE_CURL_SSL_ENGINE_NOTFOUND: number;
            ECOMMERCE_CURL_SSL_ENGINE_SETFAILED: number;
            ECOMMERCE_CURL_SSL_ISSUER_ERROR: number;
            ECOMMERCE_CURL_SSL_SHUTDOWN_FAILED: number;
            ECOMMERCE_CURL_TOO_MANY_REDIRECTS: number;
            ECOMMERCE_CURL_UNKNOWN_OPTION: number;
            ECOMMERCE_CURL_UNSUPPORTED_PROTOCOL: number;
            ECOMMERCE_CURL_UPLOAD_FAILED: number;
            ECOMMERCE_CURL_URL_MALFORMAT: number;
            ECOMMERCE_CURL_WRITE_ERROR: number;
            ECOMMERCE_DOWNLOAD_CART_ALREADY_ADDED: number;
            ECOMMERCE_DOWNLOAD_CART_FULL: number;
            ECOMMERCE_ESHOP_NOT_INITIALIZED: number;
            ECOMMERCE_EXCLUDED: number;
            ECOMMERCE_INTERNAL_ERROR_AOC_TITLE_INFO: number;
            ECOMMERCE_INTERNAL_ERROR_MCP_CONTENT: number;
            ECOMMERCE_INTERNAL_ERROR_MCP_HANDLE: number;
            ECOMMERCE_INTERNAL_ERROR_MCP_TICKET: number;
            ECOMMERCE_INTERNAL_ERROR_MCP_TITLE_VERSION: number;
            ECOMMERCE_INTERNAL_ERROR_OTHER: number;
            ECOMMERCE_INTERNAL_ERROR_SYSAPP: number;
            ECOMMERCE_INVALID_ARGUMENT: number;
            ECOMMERCE_INVALID_COUNTRY: number;
            ECOMMERCE_INVALID_DATA: number;
            ECOMMERCE_INVALID_LANGUAGE: number;
            ECOMMERCE_INVALID_META: number;
            ECOMMERCE_INVALID_MODULE: number;
            ECOMMERCE_INVALID_RESPONSE: number;
            ECOMMERCE_INVALID_SESSION: number;
            ECOMMERCE_INVALID_XML: number;
            ECOMMERCE_ITEM_ALREADY_INSTALLED: number;
            ECOMMERCE_ITEM_ALREADY_PURCHASED: number;
            ECOMMERCE_ITEM_DOWNLOAD_CODE: number;
            ECOMMERCE_ITEM_NOT_PURCHASED: number;
            ECOMMERCE_ITEM_NOT_REDEEMABLE: number;
            ECOMMERCE_ITEM_NOT_SOLD: number;
            ECOMMERCE_ITEM_PARTIALLY_PURCHASED: number;
            ECOMMERCE_ITEM_UNIQUE_ID_MISMATCH: number;
            ECOMMERCE_ITEM_UNRELEASED: number;
            ECOMMERCE_NEEDS_NETWORK_UPDATE: number;
            ECOMMERCE_NOT_CONNECTED: number;
            ECOMMERCE_NOT_FOUND: number;
            ECOMMERCE_NOT_INITIALIZED: number;
            ECOMMERCE_NOT_IN_FOREGROUND: number;
            ECOMMERCE_NOT_IN_SERVICE: number;
            ECOMMERCE_NOT_LOGGED_IN: number;
            ECOMMERCE_NOT_REDEEMABLE_ITEM_DOWNLOAD_CODE: number;
            ECOMMERCE_OTHER_PLATFORM_DOWNLOAD_CODE: number;
            ECOMMERCE_OUT_OF_MEMORY: number;
            ECOMMERCE_OUT_OF_REQUEST_BUFFER: number;
            ECOMMERCE_SERVICE_CLOSED: number;
            ECOMMERCE_SHOPPING_CART_ALREADY_ADDED: number;
            ECOMMERCE_SHOPPING_CART_FULL: number;
            ECOMMERCE_SHOPPING_CART_PARTIALLY_ADDED: number;
            ECOMMERCE_TITLE_DOWNLOAD_CODE: number;
            ECOMMERCE_UNDER_MAINTENANCE: number;
            ECOMMERCE_UNEXPECTED_RESPONSE: number;
            ECS_EXCEEDS_SERVICE_CAP: number;
            ECS_ITEM_ALREADY_PURCHASED: number;
            ECS_NEW_TICKET_ONLY: number;
            ECS_REFID_ERROR: number;
            ESHOP_REST_ACCOUNT_NOT_REGISTERED: number;
            ESHOP_REST_AKINDO_MAINTENANCE: number;
            ESHOP_REST_AKINDO_SEVICE_CLOSED: number;
            ESHOP_REST_AKINDO_UNEXPECTED_LOAD_ERROR: number;
            ESHOP_REST_AUTHORIZATION_HEADER_REQUIRED: number;
            ESHOP_REST_BALANCE_REQUIRED: number;
            ESHOP_REST_CURRENT_BALANCE_NOT_MATCH: number;
            ESHOP_REST_DECRIPT_EC_TOKEN_FAILED: number;
            ESHOP_REST_EC_SERVICE_TOKEN_REQUIRED: number;
            ESHOP_REST_EC_TOKEN_EXPIRED: number;
            ESHOP_REST_EC_TOKEN_PID_UNMATCH: number;
            ESHOP_REST_EXT_TRANSACTION_ID_REQUIRED: number;
            ESHOP_REST_INTERNAL_SERVER_ERROR: number;
            ESHOP_REST_INVALID_BALANCE: number;
            ESHOP_REST_INVALID_EC_SERVICE_TOKEN: number;
            ESHOP_REST_INVALID_EXT_TRANSACTION_ID: number;
            ESHOP_REST_INVALID_ITEM_CODE: number;
            ESHOP_REST_INVALID_ITEM_NAME: number;
            ESHOP_REST_INVALID_LANG_CODE: number;
            ESHOP_REST_INVALID_LIMIT: number;
            ESHOP_REST_INVALID_OFFSET: number;
            ESHOP_REST_INVALID_PRICE_ID: number;
            ESHOP_REST_INVALID_PRINCIPAL_ID: number;
            ESHOP_REST_INVALID_REFERENCE_ID: number;
            ESHOP_REST_INVALID_TAX_LOCATION_ID_REGISTERED: number;
            ESHOP_REST_INVALID_TITLE_CODE: number;
            ESHOP_REST_ITEM_CODE_REQUIRED: number;
            ESHOP_REST_ITEM_NAME_REQUIRED: number;
            ESHOP_REST_ITEM_NOT_EXIST: number;
            ESHOP_REST_NNAS_ACCESS_ERROR: number;
            ESHOP_REST_NOT_ENOUGH_BALANCE: number;
            ESHOP_REST_NO_AVAILABLE_PRICING: number;
            ESHOP_REST_PRICE_ID_EXPIRED: number;
            ESHOP_REST_PRICE_ID_REQUIRED: number;
            ESHOP_REST_PRINCIPAL_ID_REQUIRED: number;
            ESHOP_REST_REFERENCE_ID_REQUIRED: number;
            ESHOP_REST_SIGNATURE_REQUIRED: number;
            ESHOP_REST_TAX_LOCATION_ID_NOT_REGISTERED: number;
            ESHOP_REST_TITLE_CODE_AUTH_FAILED: number;
            ESHOP_REST_TITLE_CODE_REQUIRED: number;
            ESHOP_REST_TITLE_NOT_AVAILABLE: number;
            ESHOP_REST_TITLE_NOT_EXIST: number;
            ESHOP_REST_UNAUTHORIZED_TITLE_ACCESS: number;
            ESHOP_REST_UNSUPPORTED_LANG_CODE: number;
            ESHOP_REST_VERIFY_SIGNATURE_FAILED: number;
        };
    }
}
declare module nwf {
    module events {
        class SystemEvent extends Event {
            /**
             * Defines events dispatched by the `{@link nwf.system.WiiUSystem}` class when Nintendo Web Framework generated notifications occur.
             *
             * @see {@link nwf.system.WiiUSystem}
             * @class nwf.events.SystemEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * Dispatched when the USB Keyboard is disconnected.
             *
             * _Note: #USBKEYBOARD_DISCONNECTED or #USBKEYBOARD_CONNECTED will fire once immediately when a listener is added. This is to handle cases where the USB Keyboard was attached or removed while the system was in a state that could not detect the change._
             *
             * @property {String} [USBKEYBOARD_DISCONNECTED='usbKeyboardDisconnected']
             * @since 1.0
             * @static @constant
             */
            static USBKEYBOARD_DISCONNECTED: string;
            /**
             * Dispatched when the USB Keyboard is connected.
             *
             * _Note: #USBKEYBOARD_DISCONNECTED or #USBKEYBOARD_CONNECTED will fire once immediately when a listener is added. This is to handle cases where the USB Keyboard was attached or removed while the system was in a state that could not detect the change._
             *
             * @property {String} [USBKEYBOARD_CONNECTED='usbKeyboardConnected']
             * @since 1.0
             * @static @constant
             */
            static USBKEYBOARD_CONNECTED: string;
            /**
             * Dispatched if the application is a service application (not a game) and the Parental Controls are restricted.
             * <p/> Service applications must listen for this event and, if it is fired, must display a dialog box about the content of the application.
             * <p/> Then, using nwf.system.WiiUSystem, the Parental Control PIN must be checked before the user may continue.
             * @property {String} [PARENTAL_CONTROLS_SERVICE_RESTRICTED='parentalControlServiceApplicationRestricted']
             * @static @constant
             * @since 1.2
             */
            static PARENTAL_CONTROLS_SERVICE_RESTRICTED: string;
            /**
             * Dispatched when the asynchronous storage flushing process has completed. This is started by calling `{@link nwf.system.WiiUSystem#flushStorageAsync}`.
             * @property {String} [FLUSH_STORAGE_COMPLETE='flushStorageComplete']
             * @static @constant
             * @since 1.7
             */
            static FLUSH_STORAGE_COMPLETE: string;
        }
    }
}
declare module nwf {
    module events {
        class SystemErrorEvent extends Event {
            /**
             * Defines events dispatched by the `{@link nwf.system.WiiUSystem}` class when the Nintendo Web Framework generates warnings, notifications and/or errors.
             *
             *      var wiiUSystem = nwf.system.WiiUSystem.getInstance();
             *      wiiUSystem.addEventListener( nwf.events.SystemErrorEvent.ERROR, onSystemError, this );
             *
             *      function onSystemError( evt ) {
             *          // Filter errors and handle based on severity and type
             *          // See nwf.system.SystemErrorLevel for the list of possible error severities
             *          // See nwf.system.SystemErrorType for a list of error categories
             *          if (evt.errorLevel === nwf.system.SystemErrorLevel.ERROR_LEVEL_FATAL || evt.errorLevel === nwf.system.SystemErrorLevel.ERROR_LEVEL_ERROR) {
             *              // Fatal and Error level errors should almost always be reported to the user
             *              switch (evt.errorType) {
             *                  // Catch Automatic Internet Connection Errors
             *                  case SystemErrorType.AC:
             *                      // Handle any connection errors from the system in `handleConnectionError()` below
             *                      handleConnectionError( evt );
             *                      break;
             *                  //catch any Common Messages
             *                  case SystemErrorType.CMN_MSG:
             *                      // Handle error range by type...
             *                      // In this case any common message from the system will be handled in `handleCommonMessages()` below
             *                      handleCommonMessages( evt );
             *                      break;
             *                  default:
             *                      // Handle all uncaught errors...
             *                      // Print error to console. errorText is localized by the system based on the user's selected language
             *                      console.log( '[SystemErrorEvent] errorType: ' + evt.errorType + '; errorText: ' + evt.errorText );
             *                      break;
             *              }
             *              // Exit the application if the error was fatal
             *              if (evt.errorLevel === nwf.system.SystemErrorLevel.ERROR_LEVEL_FATAL) {
             *                  wiiUSystem.returnToMenu();
             *              }
             *          } else {
             *              // Print other errors to console. errorText is localized by the system based on the user's selected language
             *              console.log( '[SystemErrorEvent] errorLevel: ' + evt.errorLevel + '; errorType: ' + evt.errorType + '; errorText: ' + evt.errorText );
             *              break;
             *          }
             *      }
             *
             *      function handleConnectionError( evt ) {
             *      // Handle specific error based on `errorCode`...
             *          if(evt.errorCode === SystemErrorCode.DESCRIPTION_NOT_FOUND_ACCESS_POINT){
             *              displayWithSysDialog( evt );
             *          }
             *      }
             *
             *      function handleCommonMessages( evt ) {
             *          // Handle specific error based on `errorCode`...
             *          if(evt.errorCode === SystemErrorCode.CMN_MSG_NGWORD_ACCEPTABLE){
             *              displayWithSysDialog( evt );
             *          }
             *      }
             *
             *      function displayWithSysDialog( evt ) {
             *          // Display message with nwf `Dialog` class
             *          // By passing the error the message is pre-formatted to pass Lotcheck
             *          // An application can decide to display the message without this dialog box,
             *          // But you will need to refer to the Wii U Guidelines for displaying errors
             *          nwf.ui.Dialog.displaySystemError( onUIDialogClose, evt.errorCode );
             *      }
             *
             *      function onUIDialogClose(evt) {
             *          console.log( '[menu-helper] onUIDialogClose() - System Dialog closed! User selected: ' + evt.user_select );
             *      }
             *
             * @see {@link nwf.system.WiiUSystem}
             * @see {@link nwf.system.SystemErrorCode}
             * @see {@link nwf.system.SystemErrorLevel}
             * @see {@link nwf.system.SystemErrorType}
             * @class nwf.events.SystemErrorEvent
             * @extends nwf.events.Event
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            constructor();
            /**
             * System Message type. i.e. {@link nwf.system.SystemErrorType#OLV SystemErrorType.OLV}
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {uint8} [errorType=null]
             * @readonly
             * @since 1.0
             * @see nwf.system.SystemErrorType
             */
            errorType: void;
            /**
             * Error code to be displayed with message.
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {uint32} [errorCode=null]
             * @readonly
             * @since 1.0
             * @see nwf.system.SystemErrorCode
             */
            errorCode: void;
            /**
             * Localized error text to be displayed.
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {String} [errorText=null]
             * @readonly
             * @since 1.0
             */
            errorText: void;
            /**
             * The type of function the error originated from (i.e., {@link nwf.system.SystemErrorType#OLV SystemErrorType.OLV}).
             * If this is non-zero and doesn't match `errorType`, the error came from a different extension.
             * Example: {@link nwf.mv.Miiverse#initialize Miiverse.initialize} fails to connect because the account is banned.
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {uint8} [errorOrigin=0]
             * @readonly
             * @since 1.3
             * @see nwf.system.SystemErrorType
             */
            errorOrigin: number;
            /**
             * The name of the function that caused the error.
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {String} [errorSource=null]
             * @readonly
             * @since 1.3
             */
            errorSource: void;
            /**
             * The severity of the error that occurred.
             *
             * _Note: Only set when an nwf.events.SystemErrorEvent.ERROR is dispatched._
             *
             * @property {Number} [errorLevel=nwf.system.SystemErrorLevel.ERROR_LEVEL_ERROR]
             * @see nwf.system.SystemErrorLevel
             * @readonly
             * @since 1.8.1
             */
            errorLevel: number;
            /**
             * Dispatched when Nintendo Web Framework generates warnings, notifications and/or errors occur.
             * @property {String} [ERROR='error']
             * @since 1.0
             * @static @constant
             */
            static ERROR: string;
            /**
             * Dispatched when Nintendo Web Framework detects a high probability of crashing due to memory consumption.
             *
             * This event warns developers that their application is consuming high amounts of memory and that more allocations could cause a title relaunch or a crash.
             * Upon receiving this event we recommend that the application release unnecessary resources and save any necessary state information.
             *
             * @property {String} [CRASH='crash']
             * @since 1.0
             * @static @constant
             */
            static CRASH: string;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.system
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module system {
        class WiiUSystem extends nwf.events.EventDispatcher {
            /**
             * The `WiiUSystem` class provides access to system-level properties and methods.
             *
             * The `WiiUSystem` class dispatches the following events:
             *
             * - `nwf.events.SystemErrorEvent.CRASH`
             * - `nwf.events.SystemErrorEvent.ERROR`
             * - `nwf.events.SystemEvent.PARENTAL_CONTROLS_SERVICE_RESTRICTED`
             * - `nwf.events.SystemEvent.USBKEYBOARD_CONNECTED`
             * - `nwf.events.SystemEvent.USBKEYBOARD_DISCONNECTED`
             * - `nwf.events.SystemEvent.FLUSH_STORAGE_COMPLETE`
             *
             * @class nwf.system.WiiUSystem
             * @author Ryan Lynd
             * @author Shawn Gates
             * @author Cory O'Regan
             * @singleton
             * @extends nwf.events.EventDispatcher
             */
            /**
             * @private
             * The `new` method is not used to get an instance of the `WiiUSystem` singleton; use `#getInstance` instead.
             * @method constructor
             * @since 1.0
             */
            constructor();
            /**
             * A Boolean value that enables or disables access to the HOME Menu.
             *
             * The Default value of `homeButtonEnabled` is `true`.
             * If `homeButtonEnabled` is set to `true`, access to the HOME Menu will be granted.
             * If `homeButtonEnabled` is set to `false`, access to the HOME Menu will be disabled.
             * If the HOME Button is pressed when the HOME Menu is disabled, an icon will appear to indicate that access is denied.
             * @property {Boolean} [homeButtonEnabled=true]
             * @since 1.0
             */
            homeButtonEnabled: boolean;
            /**
             * Enables or disables system level screen capture on process switching.
             *
             * When an application is sent to the background the last frame is stored and other processes (applications) can access that frame as a screenshot. (by default)
             *
             * If `true` the system will store and make available a screenshot of the application for other applications (e.g., Miiverse and/or the HOME Menu). When `false` this feature is disabled.
             *
             * A developer may want to disable this feature if the content in the application is rights protected (e.g., paid-for video) or for any other reason.
             *
             * @property {Boolean} [screenCaptureEnabled=true]
             * @since 1.0
             */
            screenCaptureEnabled: boolean;
            /**
             * Nintendo Web Framework version.
             * @property {String} version
             * @readonly
             * @since 1.0
             */
            version: string;
            /**
             * Native system SDK version.
             * @property {String} systemSDKVersion
             * @readonly
             * @since 1.0
             */
            systemSDKVersion: string;
            /**
             * Checks the console type. The uppermost four bits of the return value are used to distinguish production systems from development systems. The upper four bits are 0x0 in the production system and 0x1 in the development system. The other 28 bits show the minor revision number of the console.
             * @property {int} consoleType
             * @readonly
             * @since 1.0
             */
            consoleType: number;
            /**
             * Current language setting as defined by the user in the Wii U settings.
             * @property {int} languageCode
             * @readonly
             * @since 1.0
             * @see nwf.system.WiiULanguageCode
             */
            languageCode: number;
            /**
             * Current region setting of the console. Not configurable by the user.
             * @property {int} regionCode
             * @readonly
             * @since 1.0
             * @see nwf.system.WiiURegionCode
             */
            regionCode: number;
            /**
             * Current country setting as defined by the user in the Wii U settings.
             * @property {int} countryCode
             * @readonly
             * @since 1.0
             * @see nwf.system.WiiUCountryCode
             */
            countryCode: number;
            /**
             * Returns `true` when "Use Parental Control" is set in system config setting file, or `false` if it is not.
             * @property {Boolean} [parentalControlEnabled=false]
             * @readonly
             * @since 1.0
             */
            parentalControlEnabled: boolean;
            /**
             * Number of times `#reloadTitle` has been used to  reinitialize the application.
             * If `0`, then the application is in a first-run state.
             * @property {int} reloadCount
             * @readonly
             * @since 1.6
             */
            reloadCount: number;
            /**
             * Exits the application and returns to the Wii U Menu.
             *
             * _Note: If the Wii U Menu isn't installed on the system, this function will simply open the HOME Menu._
             * @method returnToMenu
             * @since 1.0
             */
            returnToMenu(): void;
            /**
             * This API can be used to restart the current title with new parameters.
             *
             * Arguments passed to this function will be returned as an array of strings in the return object of #getLaunchParams after the restart completes.
             * @see nwf.system.WiiUSystem.getLaunchParams
             * @param {Array} [varArgs] Array of argument strings to pass to the title when relaunched.
             * @since 1.0
             */
            relaunchTitle(args?: any): void;
            /**
             * Reloads and reinitializes the current application internally without returning to the Wii U system. Upon reload, the initial page(s) specified as the start page(s) will be loaded.
             *
             * __Note:__ _This function is intended to be used as a last resort to reclaim memory in exceptional situations when it's not possible to proactively manage memory. It is not appropriate for use in normal operation, such as returning to the title screen._
             *
             * This completely destroys all existing WebViews along with all application memory. The network connection will also be reinitialized and it will be necessary to reconnect to any Nintendo services.
             *
             * For applications with extreme and inevitable memory constraints, it's recommended to call this function either as necessary when memory is running low (which can be monitored with `nwf.system.Memory.getMemoryStats`) or preemptively when transitioning between major application modes.
             *
             * This is the equivalent of using the Restart command (Shift+F5) in the Dashboard.
             * @param  {uint16} [fadeDelay=1000] Controls the number of milliseconds to fade the current displays before reloading the title. Min 0. Max 10000.
             * @param  {Object} [startPage={}] Specifies what page(s) to load after the reload completes. If not provided then the default start pages will be used.
             * @param  {String} [startPage.gp=null] The URI of the page to load on the GamePad display. An empty string will load a blank page.
             * @param  {String} [startPage.tv=null] The URI of the page to load on the TV display. An empty string will load a blank page.
             * @param  {String} [startPage.shared=null] The URI of the page to load on both displays using the Shared WebView. An empty string will load a blank page. __Note:__ _If this is specified then the `gp` and `tv` properties will be ignored._
             */
            reloadTitle(fadeDelay?: number, startPage?: any): void;
            /**
             * System Jump parameters from the TV application.
             * @return {Object/null} Object containing the passed argument(s).
             * @return {String} return.url String passed from the TV Application. Max length is 2048 bytes.
             * @since 1.0
             */
            getVODArgs(): {
                url: string;
            };
            /**
             * System parameters used when launching the application.
             *
             * Arguments passed to #relaunchTitle will be retrievable with this function.
             *
             * @see nwf.system.WiiUSystem.relaunchTitle
             * @return {Array[]} Array of arguments. _Note:This will be an empty array if no arguments are passed at launch._
             * @since 1.0
             * @deprecated 1.9.0 Use `#getLaunchParams` instead.
             */
            getSystemArgs(): string[];
            /**
             * System parameters used when launching the application.
             *
             * Arguments passed to #relaunchTitle will be retrievable with this function.
             *
             * @see nwf.system.WiiUSystem.relaunchTitle
             * @see nwf.mv.Miiverse#appParams
             * @return {Object} An object containing the launch information.
             * @return {Number} return.caller A value specifying how the application was launched. This will be set to either #CALLER_TYPE_FRIEND_LIST, #CALLER_TYPE_LAUNCHER, or #CALLER_TYPE_MIIVERSE.
             * @return {String[]} return.arguments An array of strings representing the launch arguments.
             * @since 1.9.0
             */
            getLaunchParams(): any;
            /**
             * Launches the Nintendo Browser to the page specified in the `url` parameter.
             *
             * The URL string needs to contain either the `http://` or `https://` protocol prefix. The maximum size for the string, including the prefix is 1024 characters.
             *
             * _Processing on the current application will be moved to the background while the Browser is open._
             *
             * @param {String} url The URL to the page the browser will open to. Max length is 1024 characters. An invalid URL will result in an error.
             * @return {Number} The error code of the operation. 0 = Success.
             * @since 1.0
             */
            switchToBrowser(url: string): number;
            /**
             * Launches the eShop to the specified page. If no page is specified then the page corresponding to the current application will be loaded.
             *
             * <div style="color:#aa0000; font-weight:bold;">
             * Note: This method has changed significantly in version 1.8.1. It no longer accepts 4 parameters. Instead it accepts an <code>{@link nwf.system.EShopSwitchParam}</code> object that can specify the same information as the previous version but also gives access to many more options.
             * </div><br>
             *
             * @param {nwf.system.EShopSwitchParam} [target=null] An `{@link nwf.system.EShopSwitchParam}` object specifying which eShop page to switch to.
             * @return {Number} The error code of the operation. 0 = Success.
             * @since 1.8.1
             */
            switchToEShop(target?: any): number;
            /**
             * Invokes the Account Management application for the current account.
             *
             * _Calling this API will cause the current application to exit._
             *
             * @return {Number} The error code of the operation. 0 = Success.
             * @since 1.0
             * @removed 1.8.3
             */
            launchAccountManager(): number;
            /**
             * Invokes the System Settings application. Deep link to a specific section of the settings with the `jumpTo` parameter.
             *
             * _Calling this API will cause the current application to exit._
             *
             * @param {nwf.system.WiiUSettingsScreen} jumpTo Specify which settings screen to jump to.
             * @return {Number} The error code of the operation. 0 = Success.
             * @since 1.0
             */
            launchSystemSettings(jumpTo: number): number;
            /**
             * Passes a 4-digit number and verifies it against the system's PIN.
             * @param {String} value String representing a 4-digit PIN.
             * @returns {Boolean} Status of verification. Returns `true` if the PIN is verified, or `false` if not.
             * @since 1.0
             */
            verifyParentalControlPIN(value: number): boolean;
            /**
             * Manually flushes the storage to the disk.
             *
             * When using `localStorage`, `localStorage.sync` needs to be called before manually flushing.
             *
             * __Note:__ In order to use this method, manual flushing must be enabled by selecting **Enable Manual Flushing** in the Storage page of [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Storage). Only enable manual flushing when using it.
             * @see localStorage.sync
             * @see nwf.system.WiiUSystem.flushStorageAsync
             * @since 1.4
             */
            flushStorage(): void;
            /**
             * Manually flushes the storage to the disk. When this asynchronous process completes, a `{@link nwf.events.SystemEvent#FLUSH_STORAGE_COMPLETE}` event is dispatched.
             *
             * When using `localStorage`, `localStorage.sync` needs to be called before manually flushing.
             *
             * __Note:__ In order to use this method, manual flushing must be enabled by selecting **Enable Manual Flushing** in the Storage page of [Project Settings](../../Manual/nwf/devguide/tool_ref_dashboard.html#Project_Settings-Storage). Only enable manual flushing when using it.
             * @returns {Boolean} Returns `true` if the asynchronous flushing process has started succesfully, or returns `false` if there was an error.
             * @see localStorage.sync
             * @see nwf.system.WiiUSystem.flushStorage
             * @since 1.7
             * @async
             */
            flushStorageAsync(): boolean;
            /**
             * Opens the E-Manual of the current application.
             *
             * _Processing on the current application will be moved to the background while the E-Manual is open._
             *
             * __Note:__ If the Wii U Menu isn't installed on the system, this function will open the simple HOME Menu instead.
             *
             * @return {Number} The error code of the operation. 0 = Success.
             * @since 1.9.0
             */
            switchToEManual(): number;
            /**
             * Accesses an instance of the `WiiUSystem` singleton.
             * @method getInstance
             * @return {nwf.system.WiiUSystem}
             * @static
             * @since 1.0
             */
            static getInstance(): WiiUSystem;
            /**
             * @method isSupported
             * Method to test for class availability.
             * @returns {Boolean} Returns `false` if the class is not supported, or `true` if the class is available.
             * @since 1.0
             * @static
             */
            static isSupported(): boolean;
            private static s_instance;
            /**
             * Console Type Retail.
             *
             * @property {Number} [OS_CONSOLE_RETAIL=0x00000000]
             * @since 1.0
             * @static @constant
             */
            OS_CONSOLE_RETAIL: number;
            /**
             * Console Type Development.
             *
             * @property {Number} [OS_CONSOLE_DEVELOPMENT=0x10000000]
             * @since 1.0
             * @static @constant
             */
            OS_CONSOLE_DEVELOPMENT: number;
            /**
             * Console Type Cat-Dev.
             *
             * @property {Number} [OS_CONSOLE_CAT_1_0=0x13000048]
             * @since 1.0
             * @static @constant
             */
            OS_CONSOLE_CAT_1_0: number;
            static OS_CONSOLE_CAT_1_0: number;
            /**
             * Application was launched from the Wii U Menu.
             *
             * @property {Number} [CALLER_TYPE_LAUNCHER=0]
             * @since 1.9.0
             * @static @constant
             */
            CALLER_TYPE_LAUNCHER: number;
            static CALLER_TYPE_LAUNCHER: number;
            /**
             * Application was launched from Miiverse.
             *
             * @property {Number} [CALLER_TYPE_MIIVERSE=1]
             * @see nwf.mv.Miiverse#appParams
             * @since 1.9.0
             * @static @constant
             */
            CALLER_TYPE_MIIVERSE: number;
            static CALLER_TYPE_MIIVERSE: number;
            /**
             * Application was launched from the Friend List application.
             *
             * @property {Number} [CALLER_TYPE_FRIEND_LIST=2]
             * @since 1.9.0
             * @static @constant
             */
            CALLER_TYPE_FRIEND_LIST: number;
            static CALLER_TYPE_FRIEND_LIST: number;
        }
    }
}
declare module nwf {
    module ui {
        /**
         * Animation objects can be used to provide thread independent animations that persist across page transitions.
         * These animations can be used as loading or saving animations that will not be affected by JavaScript execution or page load times.
         *
         * The source image should be a single row animation strip that will be played sequentially from left to right.
         * Each frame of the strip should be equal to the `cellWidth` parameter passed to the `Animation` constructor.
         *
         *       // Declare the variable that will contain the Animation; it is declared as null and will be constructed after the sprite strip is loaded
         *       var animation = null;
         *
         *       // Animations are added to display objects, so the first step is to get an instance of the display
         *       var displayManager = nwf.display.DisplayManager.getInstance();
         *       var gamePadDisplay = displayManager.getGamePadDisplay();
         *
         *       // An HTMLImage element is needed as the source for the animation
         *       var img = new Image();
         *
         *       // Listen for the sprite strip image to be loaded to create the animation
         *       img.addEventListener('load', onImageLoad, true);
         *
         *       // Set the src property of the image object to start the loading process
         *       img.src = 'icon.png';
         *
         *       // Handler for the load event on the HTMLImageElement
         *       function onImageLoad(evt){
         *          // Construct an Animation object with the source image
         *          // The cellWidth parameter should be evenly divisible by the width of the sprite strip image.
         *          animation = new nwf.ui.Animation(img, 16, 16);
         *
         *          // Add the Animation to the display
         *          gamePadDisplay.addAnimation(animation, 200, 200);
         *       }
         *
         *
         * @class nwf.ui.Animation
         * @author Ryan Lynd
         * @author Nick Hahn
         * @author Nate Long
         * @author Shawn Gates
         * @see nwf.display.GamePadDisplay.addAnimation
         * @see nwf.display.TVDisplay.addAnimation
         * @see nwf.display.GamePadDisplay.translateAnimation
         * @see nwf.display.TVDisplay.translateAnimation
         * @see nwf.display.GamePadDisplay.removeAnimation
         * @see nwf.display.TVDisplay.removeAnimation
         * @see nwf.display.GamePadDisplay.removeAllAnimations
         * @see nwf.display.TVDisplay.removeAllAnimations
         */
        class Animation {
            /**
             * Creates a new `Animation` object.
             *
             * @method constructor
             * @param {HTMLImageElement} img The animation strip to use.
             * @param {Number} cellWidth The width of a single animation frame.
             *                           If the `cellWidth` parameter is more than half the width of the source `HTMLImageElement`, the animation will be only one frame.
             * @param {Number} cellHeight The height of a single animation frame.
             * @param {Boolean} [loop = true] Specifies whether the animation should loop.
             * @param {Number} [loopStart = 0] The frame to begin the loop.
             * @param {Number} [loopEnd = 0] The frame to end the loop.
             */
            constructor(img: any, cellWidth: number, cellHeight: number, loop?: boolean, loopStart?: number, loopEnd?: number);
            /**
             * The `height` of a single cell of the animation.
             *
             * @property {Number} cellHeight
             * @readonly
             * @since 1.8.1
             */
            cellHeight: number;
            /**
             * The `width` of a single cell of the animation.
             *
             * @property {Number} cellWidth
             * @see `#frameCount`
             * @readonly
             * @since 1.8.1
             */
            cellWidth: number;
            /**
             * The number of frames in the animation.
             * This is determined by dividing the total width of the source image by the `#cellWidth`.
             *
             * @property {Number} frameCount
             * @readonly
             * @since 1.8.1
             */
            frameCount: number;
            /**
             * Sets whether or not the animation will loop.
             * This is set by the `loop` parameter when constructing an `Animation` object.
             *
             * @property {Boolean} looping
             * @readonly
             * @since 1.8.1
             */
            looping: boolean;
            /**
             * Playback rate of the animation normalized to 60 frames per second.
             * When set to the default of `1`, the animation plays at 60 frames per second.
             * Setting this to multiples of `1` will change the playback rate accordingly.
             * For example, setting the value to `0.5` will make the animation play at 30 frames per second.
             *
             * @property {Number} playrate
             * @since 1.8.1
             */
            playrate: number;
        }
    }
}
declare module nwf {
    module ui {
        class Dialog {
            /**
             * Class for displaying and formatting system dialog boxes.
             *
             * @class nwf.ui.Dialog
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * Constant for displaying the dialog box on the TV display.
             * @property {Number} [DISPLAY_TV=0]
             * @static @constant
             * @since 1.0
             */
            static DISPLAY_TV: number;
            /**
             * Constant for displaying the dialog box on the GamePad display.
             * @property {Number} [DISPLAY_GAMEPAD=1]
             * @static @constant
             * @since 1.0
             */
            static DISPLAY_GAMEPAD: number;
            /**
             * Constant for displaying the dialog box on all displays.
             * @property {Number} [DISPLAY_ALL=3]
             * @static @constant
             * @since 1.0
             */
            static DISPLAY_ALL: number;
            /**
             * Constant returned in the callback object when the user selects custom button 1.
             * @property {String} [USER_BTN_1='btn_1']
             * @static @constant
             * @since 1.0
             */
            static USER_BTN_1: string;
            /**
             * Constant returned in the callback object when the user selects custom button 2.
             * @property {String} [USER_BTN_2='btn_2']
             * @static @constant
             * @since 1.0
             */
            static USER_BTN_2: string;
            /**
             * Constant returned in the callback object when the user selects the OK button.
             * @property {String} [USER_OK='ok']
             * @static @constant
             * @since 1.0
             */
            static USER_OK: string;
            /**
             * Constant returned in the callback object when the user selects the CANCEL button.
             * @property {String} [USER_CANCEL='cancel']
             * @static @constant
             * @since 1.0
             */
            static USER_CANCEL: string;
            /**
             * Constant returned in the callback object when the `Dialog` is closed with `#closeDialog` from JavaScript.
             * @property {String} [NONE='none']
             * @static @constant
             * @since 1.0
             */
            static NONE: string;
            /**
             * Creates a custom Wii U Alert Dialog and displays it on the screen specified in the options object.
             * The results of the user input are passed in the arguments of the callback function when the user exits the dialog box.
             *
             *  __Note:__ _If an options object is not provided, the body will be 'undefined' and an 'OK' button wil be provided._
             *
             * @param {Function} callback Function to call when the dialog returns.
             * @param {Object} callback.output Object containing the results of user input.
             * @param {Number} callback.output.dialog_id The ID of the terminated dialog box.
             * @param {String} callback.output.user_select Determines whether the user selected Button 1 (left) or Button 2 (right) to terminate the dialog box.
             * @param {Object} [options=null] Optional parameters to set up the dialog box when it's invoked.
             * @param {String} [options.body=''] The text to display in the dialog box when it is invoked.
             * @param {String} [options.btn_1=''] The text to display on the first button. Max (24) characters.
             * @param {String} [options.btn_2=''] The text to display on the second button. Max (24) characters.
             * @param {Number} [options.display=nwf.ui.Dialog.DISPLAY_ALL] The screen on which to display the dialog box.
             * @param {Boolean} [pauseWebKit=false] When set to `true`, the dialog box pauses WebKit upon opening. When set to `false`, it does not.
             * @returns {Number} The ID of the Dialog.
             * @since 1.0
             * @static
             * @async
             */
            static displayAlert(callback: any, options?: any, pauseWebKit?: boolean): number;
            /**
             * Formats a system-dispatched error event and displays it on the screen for user confirmation. Errors are formated for Wii U Guidelines.
             * The results of the user input are passed in the arguments of the callback function when the user exits the dialog.
             * Refer to Wii U guidelines for how to properly handle system generated errors.
             *
             * _Can also be used to trigger common messages without a system dispatched event by passing in the error code of the message you would like displayed._
             *
             * @see {@link nwf.system.SystemErrorCode}
             * @param {Function} callback Function to call when the dialog box returns.
             * @param {Object} callback.output Object containing the results of user input.
             * @param {Number} callback.output.dialog_id The ID of the terminated dialog box.
             * @param {Number} callback.output.errorCode The `systemErrorCode` passed to #displaySystemError.
             * @param {String} callback.output.user_select Determines whether the user selected Button 1 (left) or Button 2 (right) to terminate the dialog box.
             * @param {Number} systemErrorCode The system-dispatched error code to be displayed.
             * @param {Number} [display=nwf.ui.Dialog.DISPLAY_ALL] The screen on which to display the dialog box.
             * @param {Boolean} [pauseWebKit=false] When set to `true`, the dialog box pauses WebKit upon opening. When set to `false`, it does not. Warning: Some system error dialog boxes do not have any buttons. If Webkit is paused with a buttonless system error dialog box open, the user will be stuck on this screen.
             * @returns {Number} The ID of the Dialog.
             * @since 1.0
             * @static
             * @async
             */
            static displaySystemError(callback: any, systemErrorCode: number, display?: number, pauseWebKit?: boolean): number;
            /**
             * Removes a `Dialog` from the `Dialog` queue.
             *
             * If not given the ID of a `Dialog` then the active (top) `Dialog` will be closed. If there are other `Dialog`s in the queue, the next `Dialog` will be displayed.
             * @param {Number} [dialog_id] The ID of the `Dialog` to close. If not provided then the active (top) `Dialog` will be closed.
             * @since 1.0
             * @static
             */
            static closeDialog(dialog_id?: number): void;
        }
    }
}
declare module nwf {
    /**
     * @class nwf.utils
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module utils {
        /**
         * Method to unpack a Wii U Texture format (.gtx) file containing a number of appended textures. Each texture is returned as a separate `HTMLImageElement` in the returned array.
         *
         *      // Use the nwf.io.File class to access a .gtx file.
         *      var gtxFile = new nwf.io.File( 'images.gtx', nwf.io.Directory.appRootDirectory );
         *
         *      gtxFile.addEventListener( nwf.events.IOEvent.READ_COMPLETE, function( evt ){
         *          // After the file is read, you can unpack it and use the `HTMLImageElements` contained within.
         *          var newImage = nwf.utils.unpackTextureBundle( evt.data )[0];
         *          document.body.appendChild( newImage );
         *      }, this );
         *
         *      gtxFile.read();
         *
         * @param {Blob} textureBundle The .gtx file data as a blob.
         * @returns {HTMLImageElement[]|null} Returns an array of `HTMLImageElements` each representing a separate texture form the file. If the data is bad `null` is returned.
         * @since 1.5
         */
        function unpackTextureBundle(textureBundle: any): HTMLImageElement[];
        /**
         * Custom log function for Nintendo Web Framework that will print the passed value to the Output Log directly without going through the Inspector console. These log messages will appear in mastered titles, unlike Inspector console log messages.
         *
         * __Note:__ _Debug log messages using this function must be removed prior to submission._
         *
         * __Note:__ _Unlike `console.log`, `nwf.utils.log` will not perform type coercion and must be passed a valid `String`._
         *
         * @param {String} value The value to be logged.
         * @since 1.8.2
         */
        function log(value: string): void;
        /**
         * A method to synchronously decode a `Blob` into a data string.
         *
         * @param {Blob} blob The `Blob` of data to turn into a data string.
         * @returns {String} The data string representing the passed in `Blob`.
         * @since 1.9.0
         */
        function blobToString(blob: Blob): String;
        /**
         * A simple method for translating a string of data into a `Blob` object.
         *
         * @param {String} string The data string of to turn into a `Blob`.
         * @returns {Blob} The `Blob` containing the passed in data string.
         * @since 1.9.0
         */
        function stringToBlob(string: String): Blob;
    }
}
declare module nwf {
    /**
     * @class nwf.utils
     * @author Ryan Lynd
     * @author Shawn Gates
     */
    module utils {
        class ProfanityFilter {
            /**
             * Class that handles profanity filtering.
             *
             * You can use this class to refer to the profanity list installed on the system, and check whether a user input string contains profanity. Refer to the latest version of the UGC Guidelines for detailed information, including when to run the profanity filter.
             *
             * __Note:__ The Profanity Filter feature must be enabled in the Features page of Project Settings for the feature to work and for `nwf.utils.ProfanityFilter` to be defined.
             *
             * @class nwf.utils.ProfanityFilter
             * @author Ryan Lynd
             * @author Shawn Gates
             */
            /**
             * The maximum number of characters for text when checking text with `#maskProfaneWords()`.
             * @property {Number} [MAX_TEXT_LENGTH=512]
             * @static @constant
             * @since 1.0
             */
            static MAX_TEXT_LENGTH: number;
            /**
             * The maximum number of characters per word when checking words with `#filterWordList()`.
             * @property {Number} [MAX_WORD_LENGTH=64]
             * @static @constant
             * @since 1.0
             */
            static MAX_WORD_LENGTH: number;
            /**
             * The maximum number of words that can be checked at one time when checking words with `#filterWordList()`.
             * @property {Number} [MAX_WORD_LIST_SIZE=16]
             * @static @constant
             * @since 1.0
             */
            static MAX_WORD_LIST_SIZE: number;
            /**
             * Sets how to behave when text is checked and profanity is discovered.
             *
             * When set to `true`, the entire word is overwritten with asterisk symbols when profanity is discovered. In some cases, this can result in display of text outside of the area of the box on the screen. For example, the asterisk symbol "*" is wider than the letter "i" when a proportional font is being used, so when overwriting the text with asterisk symbols there is a risk that the result will extend beyond the screen.
             *
             * By specifying `false` for this property, when a profanity word is discovered only one asterisk symbol is displayed in substitution for that word, and as a result there is no danger to the integrity of the user interface.
             *
             * @property {Boolean} [maskAllCharacters=true]
             * @static
             * @since 1.0
             */
            static maskAllCharacters: boolean;
            /**
             * Checks a number of specified words against the pattern list specified in the UGC guidelines to determine if strings contain profanity and should not be displayed. When profanity is found, that word is removed from the list and a new array of "clean" words is returned with the callback parameter.
             *
             * @param {Function} callback Function to call when the operation returns.
             * @param {Object} callback.output An object that stores the array of clean words.
             * @param {Array} callback.output.wordList An array of clean words.
             * @param {Array} wordList An array of words to check.
             * @see nwf.utils.ProfanityFilter.MAX_WORD_LENGTH
             * @see nwf.utils.ProfanityFilter.MAX_WORD_LIST_SIZE
             * @static
             * @async
             * @since 1.0
             */
            static filterWordList(callback: any, wordList: any): void;
            /**
             * Checks the specified text against the pattern list specified in the UGC guidelines to determine if the string contains profanity and should be masked.
             *
             * When you call this function, the specified string is checked for the presence of profanity, and places where profanity appears are masked by asterisk "*" symbols.
             *
             * @param {Function} callback Function to call when the operation returns.
             * @param {Object} callback.output An object that stores the masked text.
             * @param {String} callback.output.text The scanned and masked text.
             * @param {String} text The text to check.
             * @see nwf.utils.ProfanityFilter.MAX_TEXT_LENGTH
             * @static
             * @async
             * @since 1.0
             */
            static maskProfaneWords(callback: any, text: string): void;
            /**
             * Returns the number of numeric characters in the passed string.
             *
             * Since telephone numbers and certain other types of personal information take the form of strings that contain many numeric characters, there are restrictions on the number of numeric characters that can be displayed at the same time on the screen when users enter strings. Use this function to get the total number of numeric characters within strings on screen at once to avoid exceeding the restrictions within the UGC Guidelines.
             *
             * @param {String} text The text to check.
             * @returns {Number} Returns the number of numeric characters in the specified string. If the process fails, a negative value is returned.
             * @static
             * @since 1.0
             */
            static countNumbers(text: string): number;
        }
    }
}
/**
 * Nintendo Web Framework specific customizations to APIs for the Web Audio API.
 *
 * Click here for more information on the <a href="https://developer.mozilla.org/en-US/docs/Web_Audio_API">Web Audio API</a>.
 *
 * @class webkitAudioContext
 */
declare var webkitAudioContext: any;
interface webkitAudioContext {
    createOutputDeviceNode(deviceName: string): AudioOutputDeviceNode;
    createReverbNode(): ReverbNode;
    createChorusNode(): ChorusNode;
}
interface AudioNode {
}
interface AudioSourceNode extends AudioNode {
}
declare var webkitAudioContext: any;
/**
 * Nintendo Web Framework specific extensions to the Web Audio API AudioBuffer.
 *
 * @class AudioBuffer
 */
declare var AudioBuffer: any;
interface AudioBuffer {
    setChannelData(channel: number, data: Float32Array): void;
}
declare var webkitAudioContext: any;
/**
 * Nintendo Web Framework specific extensions to the Web Audio API AudioBufferSourceNode.
 *
 * @class AudioBufferSourceNode
 */
declare var AudioBufferSourceNode: any;
interface AudioBufferSourceNode extends AudioSourceNode {
    loopStartSamples: number;
    loopEndSamples: number;
    resetAll: boolean;
}
/**
 * Nintendo Web Framework specific Web Audio API node that routes the sound to a specific device's speakers.
 *
 * @class AudioOutputDeviceNode
 */
declare class AudioOutputDeviceNode {
    private _gain;
    private _device;
    constructor(device: string);
    /**
    * The <a href="https://developer.mozilla.org/en-US/Web/API/AudioContext">`webkitAudioContext`</a> that contains this node.
    * @property {webkitAudioContext} context=webkitAudioContext
    * @readonly
    * @since 1.3
    */
    context: webkitAudioContext;
    /**
    * The device this node is routing audio to.
    * @property {String} device=''
    * @see webkitAudioContext.createOutputDeviceNode
    * @readonly
    * @since 1.3
    */
    device: string;
    /**
    * An AudioGain Web Audio interface that is similar to the gain of an <a href="https://developer.mozilla.org/en-US/docs/Web/API/GainNode">AudioGainNode</a>.
    * @property {Number} [gain=1]
    * @since 1.3
    */
    gain: any;
    /**
    * The number of inbound connections possible to this node.
    * @property {Number} numberOfInputs=1
    * @readonly
    * @since 1.3
    */
    numberOfInputs: number;
    /**
    * The number of outbound connections possible from this node.
    * @property {Number} numberOfOutputs=1
    * @readonly
    * @since 1.3
    */
    numberOfOutputs: number;
}
/**
* Nintendo Web Framework specific extensions to the Web Audio API AudioContext.
*
* The ChorusNode produces the chorus effect normally created with the ConvolverNode.
*
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode">MDN ConvolverNode</a>
* @class ChorusNode
*/
declare class ChorusNode {
    constructor();
    /**
    * This value specifies, in milliseconds, the delay after which the input signal is mixed back into itself. The valid range is between 5 and 15.
    *
    * @since 1.4
    */
    baseDelay: number;
    /**
    * A value between 0 and 5, and specifies, in milliseconds, the maximum amount of time by which the base delay may be varied. When the base delay is at its boundary values (5 or 15 milliseconds), this parameter is ignored as there cannot be any variation.
    *
    * __Note:__ _This parameter is typically known as "chorus depth" in other products._
    *
    * @since 1.4
    */
    variation: number;
    /**
    * A value between 500 and 10000 that specifies, in milliseconds, the period of the delay variation.
    *
    * __Note:__ _This parameter is typically referred to as "chorus rate" or "chorus speed" in other products._
    *
    * @since 1.4
    */
    period: number;
}
declare var webkitAudioContext: any;
/**
* Nintendo Web Framework specific extensions to the Web Audio API PannerNode.
*
* @class PannerNode
*/
declare var PannerNode: any;
interface PannerNode extends AudioNode {
    pan: number;
    panMode: number;
    surroundPan: number;
    LISTENER: number;
    DIRECT: number;
}
/**
     * Nintendo Web Framework specific extensions to the Web Audio API AudioContext.
     *
     * The ReverbNode produces the reverb effect normally created with the ConvolverNode.
     *
     * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode">MDN ConvolverNode</a>
     * @class ReverbNode
     */
declare class ReverbNode {
    constructor();
    /**
    * A value between 0.0 and 1.0. This value modulates the coefficients of the algorithm's all-pass filters and can be used to simulate the acoustic properties of the surfaces in a room.
    *
    * @since 1.4
    */
    coloration: number;
    /**
    * A value between 0.0 and 1.0 that describes the level of interaction between channels. A value of 0.0 means that the channels are strictly independent; in other words, the reverberated signal derived from a given channel will be applied only to that channel. A value of 1.0 means that each channel contributes its reverberation signal to the other channels (as well as itself).
    *
    *__Note:__ _This property will not have any effect unless `#highQuality` is set to `true`._
    *
    * @since 1.4
    */
    crosstalk: number;
    /**
    * A value between 0.0 and 1.0 that modulates the algorithm's high-frequency attenuation. When damping is 0.0, lower frequencies are prevalent and the reverberation becomes more pronounced. As damping approaches 1.0, high frequencies are present and the reverberation becomes less pronounced.
    *
    * @since 1.4
    */
    damping: number;
    /**
    * Determines whether to use a high-quality reverberation effect. The `#crosstalk` effect is only available in high-quality mode.
    *
    * __Note:__ _The high-quality reverb effect takes significantly more proccesing power than the regular effect. It should only be used when needed._
    *
    * @since 1.4
    */
    highQuality: boolean;
    /**
    * A value between 0.0 and 1.0 that specifies the level of the reverberated signal as a fraction of the output. A value of zero means that only the original signal will be heard. A value of 1.0 means that the reverberated signal will be heard equal to the original signal.
    *
    * @since 1.4
    */
    mix: number;
    /**
    * A value between 0.0 and 0.1 that specifies, in seconds, the length of time before the reverberation starts. This parameter is especially useful for large rooms as it simulates the latency for reflected sound waves. A larger value implies a larger distance between the emitter and reflecting surfaces.
    *
    * @since 1.4
    */
    preDelay: number;
    /**
    * A value between 0.01 and 10.0 that specifies, in seconds, the length of time before the reverberation decays. A value of 0.01 seconds specifies a very small room while a value of 10.0 specifies a cathedral or stadium, for example.
    *
    * @since 1.4
    */
    reverbTime: number;
}
declare var nwfjs: any;
interface Canvas2DContextAttributes {
    antialias: any;
    stencil: boolean;
    alpha: boolean;
    graphicsMemory: boolean;
    dirty: boolean;
}
interface HTMLCanvasElement extends HTMLElement {
    _getContext(contextId: string): CanvasRenderingContext2D;
    getContext(contextId: "2d", options?: Canvas2DContextAttributes): CanvasRenderingContext2D;
}
declare var nwfjs: any;
interface CanvasRenderingContext2D {
    imageSmoothingEnabled: boolean;
    webkitImageSmoothingEnabled: boolean;
    setFillColor(r: number, g: number, b: number, a: number): void;
    colorShader: number;
    textureShader: number;
    patternShader: number;
    fontShader: number;
    drawImageStream(imageStream: number, x: number, y: number, width: number, height: number): void;
    drawImageInstanced(count: number, img: any, sourceRects: any, destRects?: any, matrix32s?: any, color?: any): void;
    loadShader(fileName: string): number;
    loadTexture(textureFileName: string): number;
    setImageColor(r: number, g: number, b: number): void;
    setPixelUniformFloat(location: number, float0: number, float1?: number, float2?: number, float3?: number): void;
    setVertexUniformFloat(location: number, float0: number, float1?: number, float2?: number, float3?: number): void;
    setPixelUniformTexture(location: number, textureId: number): void;
}
declare var nwfjs: any;
declare var nwfjs: any;
interface HTMLMediaElement extends HTMLElement {
    tvVolume: number;
    gamepadVolume: number;
    wiiRemote1Volume: number;
    wiiRemote2Volume: number;
    wiiRemote3Volume: number;
    wiiRemote4Volume: number;
    numChannels: number;
    channelPan: Float32Array;
    channelVolume: Float32Array;
}
declare var nwfjs: any;
interface Storage extends HTMLElement {
    sync(): void;
}
declare var nwfjs: any;
declare var nwfjs: any;
interface Window {
    Blob(blobParts: any, options: any): any;
    WebKitBlobBuilder(): void;
}
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
declare var nwfjs: any;
/**
 *
 * @class nwf
 * @author Ryan Lynd
 * @author Shawn Gates
 *
 * The nwf namespace (global object) encapsulates all classes, singletons, and utility methods provided by the Nintendo Web Framework API.
 * No methods or utilities exist on the namespace directly, and are instead accessed through the appropriate class.
 *
 * To access the display class, for example:
 *
 *      // Reference the class as a property of the namespace.
 *      var display = nwf.display;
 *
 * _Classes that use features that have not been enabled will be undefined._
 *
 */
/** @ignore */
declare module nwf {
    /** @ignore */
    var EMU_VERSION: string;
}
