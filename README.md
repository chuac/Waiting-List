# Waiting List

## Description
A two-page frontend app for a local business where staff can add customers and **Control** the queue on one page. The **Display** page would be open on a large TV for customers to view the dynamically updated waiting list. Also features Text-to-Speech at a click of a button. 

## Technicals
**Vue.js** and **Vuex** to store the state of the waiting list in Local Storage. Using Vuex to share events between the two pages.

**Vue.Draggable** to support drag-and-drop for list of customers in the Control page.

**SpeechSynthesis** API to speak dynamically concatenated strings.

## Demo
- [Control Page](https://waitlist.chuac.me/)
- [Display Page](https://waitlist.chuac.me/display)
