import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ar, en } from '@/src/locale/index'
import {
    getLocalStorageByKey,
    getUpdatedLocale,
    saveLocalStorage,
} from '@/src/utilities/index'
import { UIState } from '@/src/types/types'

const initialState: UIState = {
    settings: {
        locale: {
            lang: 'ar',
            dir: 'rtl',
            t: ar,
        },
        darkMode: true,
    },
    appInitialized: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLocale: (state, action) => {
            const lang = action.payload as string
            state.settings.locale = getUpdatedLocale(lang)
            const settingsToSave = {
                locale: {
                    lang: state.settings.locale.lang,
                    dir: state.settings.locale.dir,
                },
            }
            saveLocalStorage('settings', settingsToSave)
        },
    },
    extraReducers: builder => {
        // Init app
        builder.addCase(initApp.fulfilled, (state, action) => {
            const { settings } = action.payload

            if (settings) {
                const { locale } = settings
                const { lang } = locale
                const isAr = lang === 'ar'
                const t = isAr ? ar : en

                const root = window.document.documentElement
                root.lang = isAr ? 'ar' : 'en'
                root.dir = isAr ? 'rtl' : 'ltr'

                state.settings = {
                    ...settings,
                    locale: {
                        ...locale,
                        t,
                    },
                }
            } else {
                const root = window.document.documentElement
                root.lang = state.settings.locale.lang
                root.dir = state.settings.locale.dir
            }

            state.appInitialized = true
        })
    },
})

export const { setLocale } = uiSlice.actions

export default uiSlice.reducer

export const initApp = createAsyncThunk('ui/initApp', async () => {
    const settings = getLocalStorageByKey('settings')
    return {
        settings,
    }
})