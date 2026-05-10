import type { Translations } from '../types';

export const el: Translations = {
    contact: {
        title: 'Επικοινωνήστε Μαζί Μου',
        subtitle: 'Ας συζητήσουμε το project σας',
        badge: 'Επικοινωνία',
        namePlaceholder: 'Το Όνομά Σας',
        emailPlaceholder: 'Το Email Σας',
        messagePlaceholder: 'Πείτε μου λίγα λόγια για το project σας, τι χρειάζεστε και πότε θέλετε να ξεκινήσει...',
        sendButton: 'Αποστολή Μηνύματος',
        sending: 'Αποστολή...',
        success: 'Το μήνυμα στάλθηκε με επιτυχία!',
        nameLabel: 'Το Όνομά Σας',
        emailLabel: 'Το Email Σας',
        messageLabel: 'Το Μήνυμά Σας',
        email: 'Email',
        phone: 'Τηλέφωνο',
        location: 'Τοποθεσία',
        availability: 'Διαθεσιμότητα',
        availabilityTitle: 'Έτοιμοι να ξεκινήσουμε;',
        availabilityDesc:
            'Δέχομαι νέα projects και είμαι έτοιμος να σας βοηθήσω να δημιουργήσετε λογισμικό που λειτουργεί πραγματικά. Ας φτιάξουμε κάτι εξαιρετικό μαζί.',
        availableNow: 'Διαθέσιμος Τώρα',
        responseTimeLabel: 'Χρόνος απόκρισης',
        responseTimeValue: 'Εντός 24 ωρών',
        locationValue: 'Ελλάδα',
        trustNote: 'Καθαρό scope, ειλικρινή χρονοδιαγράμματα και άμεση συνεργασία από την πρώτη μέρα.',
        errorFixFields: 'Παρακαλώ διορθώστε τα παρακάτω σφάλματα.',
        errorGeneric: 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μέσω email.',
        helpfulTips: 'Χρήσιμες Συμβουλές',
        tips: [
            'Περιγράψτε τι θέλετε να δημιουργήσετε',
            'Αναφέρετε το χρονοδιάγραμμα ή την προθεσμία σας',
            'Μοιραστείτε τυχόν ειδικές ανάγκες ή απαιτήσεις',
            'Ενημερώστε με για το budget σας (προαιρετικά)',
            'Στείλτε παραδείγματα ή έμπνευση (αν έχετε)',
        ],
    },

    testimonials: {
        badge: 'Ιστορίες Πελατών',
        title: 'Τι Λένε οι Πελάτες',
        subtitle: 'Εμπιστεύονται επιχειρήσεις παντού',
        metrics: {
            satisfaction: '100% Ικανοποίηση',
            projects: '50+ Projects',
            clients: '30+ Πελάτες',
            experience: '5+ Χρόνια Εμπειρίας',
        },
        controls: {
            previousSlide: 'Προηγούμενη διαφάνεια',
            nextSlide: 'Επόμενη διαφάνεια',
        },
        items: [
            {
                role: 'CTO',
                company: 'Tech Solutions Inc.',
                content:
                    'Εξαιρετική δουλειά στην πλατφόρμα e-commerce μας. Η ομάδα παρέδωσε μια ισχυρή και επεκτάσιμη λύση που ξεπέρασε τις προσδοκίες μας.',
            },
            {
                role: 'Product Manager',
                company: 'Digital Innovations',
                content: 'Επαγγελματίες, αποδοτικοί και με υψηλή τεχνογνωσία. Μετέτρεψαν το παλιό μας σύστημα σε μια σύγχρονη responsive εφαρμογή.',
            },
        ],
    },

    footer: {
        tagline: 'Χτίζοντας λογισμικό που λειτουργεί, ένα project τη φορά',
        rights: 'Με επιφύλαξη παντός δικαιώματος.',
        basedIn: 'Με έδρα την Ελλάδα',
        emailAria: 'Email',
    },

    closingCTA: {
        title: 'Ας δημιουργήσουμε κάτι εξαιρετικό.',
        subtitle:
            'Αναλαμβάνω περιορισμένο αριθμό projects κάθε τρίμηνο ώστε να διασφαλίζεται η ποιότητα. Ας συζητήσουμε πώς μπορώ να σας βοηθήσω να δημιουργήσετε λογισμικό που λειτουργεί πραγματικά.',
        button: 'Ξεκινήστε το Project Σας',
        buttonAria: 'Ξεκινήστε το project σας',
    },

    landing: {
        seo: {
            title: 'CodeGetIt - Σύγχρονη Ανάπτυξη Web',
            description: 'Ένα σύγχρονο website για υπηρεσίες web development, βασισμένο στη σαφήνεια, την εμπιστοσύνη και την πρόοδο.',
        },
        hero: {
            navigation: {
                brandInitial: 'C',
                brandLabel: 'CodeGetIT',
                contactButton: 'Επικοινωνία',
            },

            // @ts-expect-error Will be fixed in the future, we don't support el yet.
            mobile: {
                title: 'Μετατρέψτε την Ιδέα Σας σε',
                highlight: 'Πραγματική Επιχείρηση',
                subtitle:
                    'Δείτε πώς μπορεί να μοιάζει η επιχείρησή σας online. Δημιουργούμε websites και εφαρμογές που φέρνουν πελάτες και αυξάνουν τα έσοδά σας.',
            },

            desktop: {
                title: 'Μετατρέψτε την Ιδέα Σας σε',
                highlight: 'Πραγματική Επιχείρηση',
                subtitle:
                    'Είτε θέλετε να πουλάτε online, να δέχεστε κρατήσεις ή να διαχειρίζεστε πελάτες - δημιουργούμε websites και εφαρμογές που φέρνουν πραγματικούς πελάτες και αυξάνουν τα έσοδά σας.',
            },

            benefits: [
                {
                    title: 'Φτιαγμένο για την Επιχείρησή Σας',
                    description: 'Κατασκευασμένο ακριβώς όπως το χρειάζεστε - όχι ένα γενικό template',
                },
                {
                    title: 'Αναλαμβάνουμε τα Πάντα',
                    description: 'Από την ιδέα μέχρι το launch - δεν χρειάζεται να γνωρίζετε τεχνολογία',
                },
                {
                    title: 'Γρήγορα Αποτελέσματα',
                    description: 'Βγείτε online γρήγορα και ξεκινήστε να αποκτάτε πελάτες',
                },
            ],

            ctas: {
                primary: 'Δωρεάν Προσφορά',
                secondary: 'Δείτε Παραδείγματα',
                mobileSecondary: 'Δείτε Περισσότερα Παραδείγματα',
                note: 'Δωρεάν συμβουλευτική • Χωρίς δέσμευση • Γρήγορη απάντηση',
            },
        },

        stats: {
            labels: ['Projects που Παραδόθηκαν', 'Ικανοποίηση Πελατών', 'Ευχαριστημένοι Πελάτες', 'Χρόνια Εμπειρίας'],
        },

        services: {
            from: 'Από {price} €',
            eyebrow: 'Υπηρεσίες',
            title: 'Επιλέξτε τη σωστή λύση για την επιχείρησή σας',
            description:
                'Από γρήγορα marketing websites μέχρι ολοκληρωμένες web εφαρμογές, προσαρμόζουμε τη λύση στις πραγματικές ανάγκες της επιχείρησής σας.',
            featured: 'Πιο Δημοφιλές',
            getStarted: 'Ξεκινήστε',
            priceDisclaimer: '',
            timeEstimateDisclaimer:'',
            items: [
                {
                    title: 'Στατικά Websites',
                    description: 'Γρήγορα και καλαίσθητα websites για επιχειρήσεις που χρειάζονται ισχυρή online παρουσία.',
                    features: ['Responsive Design', 'SEO Optimization', 'Γρήγορη Φόρτωση', 'Εύκολη Συντήρηση'],
                    priceKey: 'marketing.staticStartingPrice',
                    defaultPrice: '2500',
                },
                {
                    title: 'Web Εφαρμογές',
                    description: 'Διαδραστικές εφαρμογές με business logic προσαρμοσμένο στις ανάγκες σας.',
                    features: ['Όλα όσα περιλαμβάνονται στα Static Websites', 'Custom Features', 'Σύστημα Χρηστών', 'API Integration (Προαιρετικό)'],
                    priceKey: 'marketing.webStartingPrice',
                    defaultPrice: '3500',
                },
            ],
        },

        process: {
            eyebrow: 'Διαδικασία',
            title: 'Μια απλή διαδικασία που κρατά το project σε κίνηση',
            description: 'Κρατάμε τη δουλειά οργανωμένη και τις αποφάσεις ξεκάθαρες ώστε το project να προχωρά χωρίς χάος.',
            steps: [
                {
                    title: 'Σχεδιασμός & Κατανόηση',
                    description: 'Καθορίζουμε στόχους, απαιτήσεις και κοινό πριν ξεκινήσει οποιοδήποτε design ή development.',
                },
                {
                    title: 'Design & Αρχιτεκτονική',
                    description: 'Σχεδιάζουμε το interface και την τεχνική προσέγγιση ώστε το αποτέλεσμα να είναι λειτουργικό και επεκτάσιμο.',
                },
                {
                    title: 'Ανάπτυξη & Testing',
                    description: 'Η ανάπτυξη γίνεται σε οργανωμένα στάδια με testing και feedback σε κάθε βήμα.',
                },
                {
                    title: 'Launch & Υποστήριξη',
                    description: 'Κάνουμε deploy, παρακολουθούμε το project και παρέχουμε υποστήριξη μετά το launch.',
                },
            ],
        },

        faq: {
            eyebrow: 'Συχνές Ερωτήσεις',
            title: 'Ερωτήσεις που γίνονται συχνά',
            description: 'Απαντήσεις στις πιο συχνές απορίες ώστε να υπάρχει ξεκάθαρη εικόνα πριν ξεκινήσουμε.',
            items: [
                {
                    question: 'Πόσο διαρκεί συνήθως ένα project;',
                    answer: 'Μικρότερα websites χρειάζονται περίπου 2 έως 4 εβδομάδες, ενώ μεγαλύτερες εφαρμογές μπορεί να χρειαστούν 8 έως 16 εβδομάδες ανάλογα με το scope.',
                },
                {
                    question: 'Αναλαμβάνετε hosting και deployment;',
                    answer: 'Ναι. Μπορούμε να κάνουμε deploy σε σύγχρονες cloud πλατφόρμες και να σας βοηθήσουμε να επιλέξετε την κατάλληλη υποδομή.',
                },
                {
                    question: 'Προσφέρετε υποστήριξη μετά το launch;',
                    answer: 'Ναι. Παρέχουμε υποστήριξη, βελτιώσεις, ενημερώσεις ασφαλείας και monitoring μετά την κυκλοφορία.',
                },
            ],
        },
        // @ts-expect-error Will be fixed in the future, we don't support el yet.
        footer: {
            brandName: 'CodeGetIt',
            tagline: 'Δημιουργούμε σύγχρονες web εμπειρίες που βοηθούν τις επιχειρήσεις να αναπτυχθούν online.',
            categories: {
                services: 'Υπηρεσίες',
                company: 'Εταιρεία',
                resources: 'Πόροι',
            },
            rights: 'Με επιφύλαξη παντός δικαιώματος.',
            privacy: 'Πολιτική Απορρήτου',
            terms: 'Όροι Χρήσης',
            social: {
                github: 'GitHub',
                linkedin: 'LinkedIn',
                email: 'Email',
            },
        },
    },

    publicOffer: {
        loadingOffer: 'Φόρτωση προσφοράς...',
        offerNotFoundTitle: 'Η προσφορά δεν βρέθηκε',
        offerNotFoundBody: 'Δεν ήταν δυνατή η φόρτωση της προσφοράς. Ελέγξτε τον σύνδεσμο και δοκιμάστε ξανά.',
        forLabel: 'Για:',
        valuedClient: 'Αξιότιμε/η πελάτη',
        expiredBanner: 'Αυτή η προσφορά έχει λήξει και δεν μπορεί πλέον να γίνει αποδεκτή ή να απορριφθεί.',
        acceptedBanner: '✓ Έχετε αποδεχθεί αυτή την προσφορά.',
        rejectedBanner: '✗ Έχετε απορρίψει αυτή την προσφορά.',
        yourFeedback: 'Τα σχόλιά σας:',
        cancelledBanner: 'Αυτή η προσφορά έχει ακυρωθεί.',
        acceptedTitle: '✓ Η προσφορά έγινε αποδεκτή!',
        acceptedBody: 'Ευχαριστούμε που αποδεχθήκατε την προσφορά. Θα επικοινωνήσουμε σύντομα για τα επόμενα βήματα.',
        feedbackSubmittedTitle: '✓ Τα σχόλια υποβλήθηκαν',
        feedbackSubmittedBody: 'Εκτιμούμε τα σχόλιά σας και θα τα εξετάσουμε προσεκτικά.',
        offerDetails: 'Στοιχεία προσφοράς',
        validUntil: 'Ισχύει έως',
        notSpecified: 'Δεν έχει οριστεί',
        sentOn: 'Απεστάλη στις',
        revision: 'Έκδοση',
        deliverables: 'Παραδοτέα',
        description: 'Περιγραφή',
        quantity: 'Ποσ.',
        unitPrice: 'Τιμή μονάδας',
        subtotal: 'Μερικό σύνολο',
        tax: 'Φόρος',
        total: 'Σύνολο',
        processing: 'Επεξεργασία...',
        acceptOffer: '✓ Αποδοχή προσφοράς',
        rejectOffer: '✗ Απόρριψη προσφοράς',
        scope: 'Εύρος εργασιών',
        rejectModalTitle: 'Απόρριψη προσφοράς',
        rejectModalBody: 'Επιβεβαιώστε και μοιραστείτε τα σχόλιά σας για να βελτιώσουμε την πρόταση.',
        feedbackLabel: 'Σχόλια *',
        feedbackPlaceholder: 'Πείτε μας τι θα βοηθούσε να βελτιώσουμε αυτή την προσφορά...',
        cancel: 'Ακύρωση',
        submitting: 'Υποβολή...',
        confirmReject: 'Επιβεβαίωση απόρριψης',
    },
};
