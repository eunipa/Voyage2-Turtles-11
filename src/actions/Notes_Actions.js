// redux action types for Notes Tab

export const NotesVisibilityFilters = {
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_ARCHIVED: 'SHOW_ARCHIVED',
    SHOW_PINNED: 'SHOW_PINNED',
    SHOW_SEARCH: 'SHOW_SEARCH'
}

export const ADD_NOTES = 'ADD_NOTES'
export const TOGGLE_NOTES = 'TOGGLE_NOTES'
export const DELETE_NOTES = 'DELETE_NOTES'
export const SET_NOTES_VISIBILITY_FILTER = 'SET_NOTES_VISIBILITY_FILTER'

export function addNotes(text) {
    return { type: ADD_NOTES, text }
}

export function toggleNotes(index) {
    return { type: TOGGLE_NOTES, index }
}

export function deleteNotes(index) {
    return { type: DELETE_NOTES, index }
}

export function setNotesVisibilityFilter(filter) {
    return { type: SET_NOTES_VISIBILITY_FILTER, filter }
}