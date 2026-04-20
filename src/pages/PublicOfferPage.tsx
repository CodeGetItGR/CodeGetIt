import { useState, useCallback, useMemo, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { publicOfferApi, type RejectOfferPayload } from '@/admin/api/publicOffers';
import type { OfferLineItemResponse } from '@/admin/types';
import { Textarea } from '@/components/ui/Textarea';
import { useLocale } from '@/i18n/UseLocale';

function formatDate(dateString: string, localeTag: string): string {
  return new Date(dateString).toLocaleDateString(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateTime(dateString: string, localeTag: string): string {
  return new Date(dateString).toLocaleDateString(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const PublicOfferPage = () => {
  const { token = '' } = useParams();
  const { locale } = useLocale();
  const [rejectionNote, setRejectionNote] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionState, setActionState] = useState<'none' | 'accepting' | 'rejecting' | 'accepted' | 'rejected'>('none');

  const localeTag = useMemo(() => (locale === 'el' ? 'el-GR' : 'en-US'), [locale]);
  const text = useMemo(
    () =>
      locale === 'el'
        ? {
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
          }
        : {
            loadingOffer: 'Loading offer...',
            offerNotFoundTitle: 'Offer not found',
            offerNotFoundBody: 'Unable to load the offer. Please check the link and try again.',
            forLabel: 'For:',
            valuedClient: 'Valued Client',
            expiredBanner: 'This offer has expired and can no longer be accepted or rejected.',
            acceptedBanner: '✓ You have accepted this offer.',
            rejectedBanner: '✗ You have rejected this offer.',
            yourFeedback: 'Your feedback:',
            cancelledBanner: 'This offer has been cancelled.',
            acceptedTitle: '✓ Offer Accepted!',
            acceptedBody: 'Thank you for accepting this offer. We will be in touch shortly to discuss the next steps.',
            feedbackSubmittedTitle: '✓ Feedback Submitted',
            feedbackSubmittedBody: 'We appreciate your feedback and will review it carefully.',
            offerDetails: 'Offer Details',
            validUntil: 'Valid Until',
            notSpecified: 'Not specified',
            sentOn: 'Sent On',
            revision: 'Revision',
            deliverables: 'Deliverables',
            description: 'Description',
            quantity: 'Qty',
            unitPrice: 'Unit Price',
            subtotal: 'Subtotal',
            tax: 'Tax',
            total: 'Total',
            processing: 'Processing...',
            acceptOffer: '✓ Accept Offer',
            rejectOffer: '✗ Reject Offer',
            scope: 'Scope',
            rejectModalTitle: 'Reject offer',
            rejectModalBody: 'Please confirm and share your feedback so we can improve the proposal.',
            feedbackLabel: 'Feedback *',
            feedbackPlaceholder: 'Tell us what would help us improve this offer...',
            cancel: 'Cancel',
            submitting: 'Submitting...',
            confirmReject: 'Confirm reject',
          },
    [locale],
  );

  const offerQuery = useQuery({
    queryKey: ['public-offer', token],
    queryFn: () => publicOfferApi.getByToken(token),
    enabled: Boolean(token),
  });

  const acceptMutation = useMutation({
    mutationFn: () => publicOfferApi.accept(token),
    onSuccess: () => {
      setActionState('accepted');
      // Refetch to get updated state
      offerQuery.refetch();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (payload: RejectOfferPayload) => publicOfferApi.reject(token, payload),
    onSuccess: () => {
      setActionState('rejected');
      setShowRejectModal(false);
      setRejectionNote('');
      offerQuery.refetch();
    },
  });

  const handleAccept = useCallback(() => {
    setActionState('accepting');
    acceptMutation.mutate();
  }, [acceptMutation]);

  const handleRejectSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (rejectionNote.trim()) {
        setActionState('rejecting');
        rejectMutation.mutate({ rejectionNote: rejectionNote.trim() });
      }
    },
    [rejectionNote, rejectMutation],
  );

  if (offerQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">{text.loadingOffer}</p>
      </div>
    );
  }

  if (offerQuery.isError || !offerQuery.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{text.offerNotFoundTitle}</h2>
          <p className="text-gray-600">{text.offerNotFoundBody}</p>
        </div>
      </div>
    );
  }

  const offer = offerQuery.data;
  const isActionable = offer.status === 'SENT' && !offer.expired;
  const isAccepted = offer.status === 'ACCEPTED_BY_CLIENT';
  const isRejected = offer.status === 'REJECTED_BY_CLIENT';
  const isCancelled = offer.status === 'CANCELLED';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{offer.offer.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{text.forLabel} {offer.recipientName || text.valuedClient}</p>
          </div>

          {/* Project context */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900">{offer.project.name}</h3>
            {offer.project.description && (
              <p className="text-sm text-blue-800 mt-1">{offer.project.description}</p>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status messages */}
        {offer.expired && !isActionable && (
          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-amber-900 font-medium">{text.expiredBanner}</p>
          </div>
        )}

        {isAccepted && actionState !== 'accepted' && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
            <p className="text-emerald-900 font-medium">{text.acceptedBanner}</p>
          </div>
        )}

        {isRejected && actionState !== 'rejected' && (
          <div className="mb-6 rounded-lg bg-orange-50 border border-orange-200 p-4">
            <p className="text-orange-900 font-medium">{text.rejectedBanner}</p>
            {offer.rejectionNote && (
              <p className="text-sm text-orange-800 mt-2">{text.yourFeedback} {offer.rejectionNote}</p>
            )}
          </div>
        )}

        {isCancelled && (
          <div className="mb-6 rounded-lg bg-gray-100 border border-gray-300 p-4">
            <p className="text-gray-900 font-medium">{text.cancelledBanner}</p>
          </div>
        )}

        {actionState === 'accepted' && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
            <p className="text-lg font-semibold text-emerald-900">{text.acceptedTitle}</p>
            <p className="text-sm text-emerald-800 mt-2">{text.acceptedBody}</p>
          </div>
        )}

        {actionState === 'rejected' && (
          <div className="mb-6 rounded-lg bg-orange-50 border border-orange-200 p-6 text-center">
            <p className="text-lg font-semibold text-orange-900">{text.feedbackSubmittedTitle}</p>
            <p className="text-sm text-orange-800 mt-2">{text.feedbackSubmittedBody}</p>
          </div>
        )}

        {/* Offer details */}
        <section className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">{text.offerDetails}</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-600">{text.validUntil}</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {offer.offer.validUntil ? formatDate(offer.offer.validUntil, localeTag) : text.notSpecified}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">{text.sentOn}</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {offer.sentAt ? formatDateTime(offer.sentAt, localeTag) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">{text.revision}</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">#{offer.revisionNumber}</dd>
            </div>
          </dl>
        </section>

        {/* Line items */}
        <section className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{text.deliverables}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">{text.description}</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">{text.quantity}</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">{text.unitPrice}</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">{text.subtotal}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {offer.offer.lineItems.map((item: OfferLineItemResponse) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{item.description}</td>
                    <td className="px-6 py-4 text-right text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {item.unitPrice.toFixed(2)} {offer.offer.currency}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      {item.lineSubtotal.toFixed(2)} {offer.offer.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{text.subtotal}</span>
                <span className="text-gray-900 font-medium">
                  {(offer.offer.subtotalAmount || 0).toFixed(2)} {offer.offer.currency}
                </span>
              </div>
              {typeof offer.offer.taxAmount === 'number' && offer.offer.taxAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{text.tax} ({offer.offer.taxRate}%)</span>
                  <span className="text-gray-900 font-medium">
                    {offer.offer.taxAmount.toFixed(2)} {offer.offer.currency}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="font-semibold text-gray-900">{text.total}</span>
                <span className="font-bold text-lg text-gray-900">
                  {(offer.offer.totalAmount || 0).toFixed(2)} {offer.offer.currency}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        {isActionable && actionState === 'none' && (
          <section className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAccept}
                disabled={acceptMutation.isPending}
                className="inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {acceptMutation.isPending ? text.processing : text.acceptOffer}
              </button>

              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition"
              >
                {text.rejectOffer}
              </button>
            </div>
          </section>
        )}

        {/* Offer description */}
        {offer.offer.description && (
          <section className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{text.scope}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{offer.offer.description}</p>
          </section>
        )}

        {showRejectModal && isActionable && actionState === 'none' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowRejectModal(false)} aria-hidden="true" />
            <div className="relative w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-900">{text.rejectModalTitle}</h3>
              <p className="mt-2 text-sm text-gray-600">{text.rejectModalBody}</p>

              <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{text.feedbackLabel}</label>
                  <Textarea
                    value={rejectionNote}
                    onChange={(event) => setRejectionNote(event.target.value)}
                    placeholder={text.feedbackPlaceholder}
                    rows={4}
                    className="w-full rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(false)}
                    disabled={rejectMutation.isPending}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {text.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={!rejectionNote.trim() || rejectMutation.isPending}
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {rejectMutation.isPending ? text.submitting : text.confirmReject}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};





