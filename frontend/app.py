import streamlit as st


st.set_page_config(
    page_title="Disaster Response AI",
    page_icon="🚨",
    layout="wide"
)


# ==========================================
# TITLE
# ==========================================

st.title("🚨 Disaster Response AI")

st.write(
    "Emergency reporting and disaster response coordination system."
)


st.markdown("---")


# ==========================================
# ROLE SELECTION
# ==========================================

st.header("Choose Your Role")

st.write("I am:")


role = st.radio(
    "Select your role",
    [
        "👤 Citizen",
        "🚑 Responder"
    ],
    horizontal=True,
    label_visibility="collapsed"
)


st.markdown("---")


# ==========================================
# CITIZEN
# ==========================================

if role == "👤 Citizen":

    st.info(
        "Report an emergency with its location and the number "
        "of people affected."
    )

    if st.button(
        "Continue as Citizen",
        type="primary"
    ):

        st.switch_page("pages/citizen.py")


# ==========================================
# RESPONDER
# ==========================================

elif role == "🚑 Responder":

    st.info(
        "View active emergencies, priorities and response "
        "resource recommendations."
    )

    if st.button(
        "Continue as Responder",
        type="primary"
    ):

        st.switch_page("pages/responder.py")