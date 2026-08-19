import streamlit as st

from storage.database import get_reports


st.set_page_config(
    page_title="Offline Reports",
    page_icon="📡",
    layout="wide"
)


st.title("📡 Offline Emergency Reports")

st.write(
    "Emergency reports stored locally while "
    "the network is unavailable."
)

st.divider()


reports = get_reports()


if not reports:

    st.info(
        "No locally stored emergency reports."
    )

else:

    pending = [
        report
        for report in reports
        if report[8] == 0
    ]

    synced = [
        report
        for report in reports
        if report[8] == 1
    ]


    # -----------------------------
    # STATISTICS
    # -----------------------------

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Total Reports",
            len(reports)
        )

    with col2:
        st.metric(
            "⏳ Pending Sync",
            len(pending)
        )

    with col3:
        st.metric(
            "✅ Synchronized",
            len(synced)
        )


    st.divider()


    # -----------------------------
    # PENDING REPORTS
    # -----------------------------

    st.header("⏳ Pending Reports")


    if not pending:

        st.success(
            "All reports are synchronized."
        )

    else:

        for report in pending:

            (
                report_id,
                emergency_type,
                description,
                latitude,
                longitude,
                people,
                risk,
                priority,
                synced,
                created_at
            ) = report


            with st.container(border=True):

                st.subheader(
                    f"🚨 Report #{report_id}"
                )

                st.write(
                    f"**Emergency:** {emergency_type}"
                )

                st.write(
                    f"**Description:** {description}"
                )

                st.write(
                    f"**People affected:** {people}"
                )

                st.write(
                    f"**Location:** "
                    f"{latitude}, {longitude}"
                )

                st.write(
                    f"**Created:** {created_at}"
                )

                st.warning(
                    "📡 Waiting for network synchronization"
                )