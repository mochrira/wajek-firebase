# Wajek Firebase

## Installation

```
npm install firebase --save
npm install @wajek/wui --save
npm install @wajek/firebase --save
```

## Resolve Warnings

You might read following warning when you build your project

WARNING in ......... CommonJS or AMD dependencies can cause optimization bailouts.

To remove this warning, add "firebase" to "allowedCommonJsDependencies" of your project options at angular.json

```

...
{
    ...
    "projects" : {
        "your-project" : {
            ...
            "architect": {
                ...
                "build": {
                    ...
                    "options": {
                        "allowedCommonJsDependencies": [
                            "firebase"
                        ]
                    }
                    ...
                }
                ...
            }
            ...
        }
    }
    ...
}
...

```

