declare class Baobab {
    constructor(initialStore: any, options?: any);
    get(): any;
    set(path: string, value: any);
    unset(path: string);
    /**
    * Method used to select data within the tree by creating a cursor. Cursors
    * are kept as singletons by the tree for performance and hygiene reasons.
    *
    * Arity (1):
    * @param {path}    path - Path to select in the tree.
    *
    * Arity (*):
    * @param {...step} path - Path to select in the tree.
    *
    * @return {Cursor}      - The resultant cursor.
    */
    select(path: string | string[]): Cursor;
    /**
     * Method used to update the tree. Updates are simply expressed by a path,
     * dynamic or not, and an operation.
     *
     * This is where path solving should happen and not in the cursor.
     *
     * @param  {path}   path      - The path where we'll apply the operation.
     * @param  {object} operation - The operation to apply.
     * @return {mixed} - Return the result of the update.
     */
    update(path, operation): any;

    /**
     * Method committing the updates of the tree and firing the tree's events.
     *
     * @return {Baobab} - The tree instance for chaining purposes.
     */
    commit(): Baobab;

     /**
       * Method used to watch a collection of paths within the tree. Very useful
       * to bind UI components and such to the tree.
       *
       * @param  {object} mapping - Mapping of paths to listen.
       * @return {Cursor}         - The created watcher.
       */
    watch(mapping): Cursor;

    /**
      * Method releasing the tree and its attached data from memory.
      */
    release();

   /**
    * Overriding the `toJSON` method for convenient use with JSON.stringify.
    *
    * @return {mixed} - Data at cursor.
    */
    toJSON(): any;
}

declare class Cursor extends Emitter {
    constructor(tree, path, hash);
    isRoot: boolean;
    isLeaf: boolean;
    isBranch: boolean;
    select(path): Cursor;
    exists(path): boolean;
    get(path?): any;
    set(path: string, value: any);
    set(value: any);
    unset(path: string);
    /**
  * Methods releasing the cursor from memory.
  */
    release();
}

declare class Emitter {
    unbindAll();
     /**
   * This method binds one or more functions to the emitter, handled to one or a
   * suite of events. So, these functions will be executed anytime one related
   * event is emitted.
   *
   * It is also possible to bind a function to any emitted event by not
   * specifying any event to bind the function to.
   *
   * Recognized options:
   * *******************
   *  - {?boolean} once   If true, the handlers will be unbound after the first
   *                      execution. Default value: false.
   *  - {?object}  scope  If a scope is given, then the listeners will be called
   *                      with this scope as "this".
   *
   * Variant 1:
   * **********
   * > myEmitter.on('myEvent', function(e) { console.log(e); });
   * > // Or:
   * > myEmitter.on('myEvent', function(e) { console.log(e); }, { once: true });
   *
   * @param  {string}   event   The event to listen to.
   * @param  {function} handler The function to bind.
   * @param  {?object}  options Eventually some options.
   * @return {Emitter}          Returns this.
   *
   * Variant 2:
   * **********
   * > myEmitter.on(
   * >   ['myEvent1', 'myEvent2'],
   * >   function(e) { console.log(e); }
   * >);
   * > // Or:
   * > myEmitter.on(
   * >   ['myEvent1', 'myEvent2'],
   * >   function(e) { console.log(e); }
   * >   { once: true }}
   * >);
   *
   * @param  {array}    events  The events to listen to.
   * @param  {function} handler The function to bind.
   * @param  {?object}  options Eventually some options.
   * @return {Emitter}          Returns this.
   *
   * Variant 3:
   * **********
   * > myEmitter.on({
   * >   myEvent1: function(e) { console.log(e); },
   * >   myEvent2: function(e) { console.log(e); }
   * > });
   * > // Or:
   * > myEmitter.on({
   * >   myEvent1: function(e) { console.log(e); },
   * >   myEvent2: function(e) { console.log(e); }
   * > }, { once: true });
   *
   * @param  {object}  bindings An object containing pairs event / function.
   * @param  {?object}  options Eventually some options.
   * @return {Emitter}          Returns this.
   *
   * Variant 4:
   * **********
   * > myEmitter.on(function(e) { console.log(e); });
   * > // Or:
   * > myEmitter.on(function(e) { console.log(e); }, { once: true});
   *
   * @param  {function} handler The function to bind to every events.
   * @param  {?object}  options Eventually some options.
   * @return {Emitter}          Returns this.
   */
    on(event: string | string[], callback: Function, options?: any): Emitter;
    on(eventsMap: Object, options?: any): Emitter;
    on(callback: Function, options?: any): Emitter;

    /**
   * This method works exactly as the previous #on, but will add an options
   * object if none is given, and set the option "once" to true.
   *
   * The polymorphism works exactly as with the #on method.
   */
    once(event: string | string[], callback: Function, options: any): Emitter;
    once(eventsMap: Object, options: any): Emitter;
    once(callback: Function, options: any): Emitter;

    off(callback: Function);
    off(event: string | string[]);
    off(eventsMap: Object);

    /**
   * This method retrieve the listeners attached to a particular event.
   *
   * @param  {?string}    Name of the event.
   * @return {array}      Array of handler functions.
   */
    listeners(events: string): Function[];
    /**
   * This method disabled the emitter, which means its emit method will do
   * nothing.
   *
   * @return {Emitter} Returns this.
   */
    disable();
      /**
   * This method enables the emitter.
   *
   * @return {Emitter} Returns this.
   */
    enable();
}