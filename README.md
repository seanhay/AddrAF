# AddrAF - Address AutoFill

AddrAF is a lightweight plugin to add *Japanese* postcode lookup to address input forms.

### Installation

Simply include the plugin file in your HTML file/project...
```html
<script src="addraf.min.js"></script>
```
Then use with...

```js
addraf('.selector')
```
Add the required attributes to the postcode input tag, and optional attributes to the inputs that you want to be filled.
Note that this also works with prefecture select lists, as long as the prefecture option text matches exactly (ie. *愛知県*, not just *愛知*).
```HTML
<form class=".selector">
    <input type="text" postcode>
    
    <input type="text" prefecture>
    <select prefecture>
        <option value="神奈川">神奈川</option>
        <option value="愛知">愛知</option>
        <option value="熊本">熊本</option>
    </select>
    <input type="text" city>
    <input type="text" address1>
    <input type="text" prefectureKana>
    <input type="text" cityKana>
    <input type="text" address1Kana>
</form>
```