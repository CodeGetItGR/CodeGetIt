import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type FormEvent,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { offerApi, type CreateLineItemPayload, type UpdateLineItemPayload } from '@/admin/api/offers';
import { queryKeys } from '@/admin/api/queryKeys';
import { DetailContentTabs } from '@/admin/components/DetailContentTabs';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useEntityDraftState } from '@/admin/hooks/useEntityDraftState';
import type { OfferLineItemResponse } from '@/admin/types';
import { useLocale } from '@/i18n/UseLocale';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface OfferFormState {
  title: string;
  description: string;
  recipientName: string;
  recipientEmail: string;
  priceAmount: string;
  taxRate: string;
  currency: string;
  validUntil: string;
}

const defaultFormState: OfferFormState = {
  title: '',
  description: '',
  recipientName: '',
  recipientEmail: '',
  priceAmount: '',
  taxRate: '',
  currency: 'EUR',
  validUntil: '',
};

function toIsoDateInput(value?: string | null): string {
  if (!value) return '';
  return value.slice(0, 10);
}

interface LineItemFormState {
  description: string;
  quantity: string;
  unitPrice: string;
  taxRate: string;
  sortOrder: string;
}

const defaultLineItemFormState: LineItemFormState = {
  description: '',
  quantity: '1',
  unitPrice: '',
  taxRate: '',
  sortOrder: '',
};

export const OfferDetailPage = () => {
  const { id = '' } = useParams();
  const { locale } = useLocale();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const [showLineItemForm, setShowLineItemForm] = useState(false);
  const [editingLineItemId, setEditingLineItemId] = useState<string | null>(null);
  const [lineItemFormState, setLineItemFormState] = useState<LineItemFormState>(defaultLineItemFormState);
  const [showReviseReason, setShowReviseReason] = useState(false);
  const [reviseReason, setReviseReason] = useState('');
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const text = useMemo(
    () =>
      locale === 'el'
        ? {
            loading: 'Φορτωση προσφορας...',
            notFound: 'Η προσφορα δεν βρεθηκε.',
            pageTitle: 'Λεπτομερειες προσφορας',
            preview: 'Προεπισκοπηση public view',
            back: 'Πισω στις προσφορες',
            feedback: 'Σχολιο πελατη:',
            actions: 'Ενεργειες',
            noActions: 'Δεν υπαρχουν αλλες ενεργειες για αυτη την κατασταση.',
            sending: 'Αποστολη...',
            send: 'Αποστολη στον πελατη',
            cancelOffer: 'Ακυρωση προσφορας',
            discardDraft: 'Απορριψη draft',
            reviseToDraft: 'Επαναφορα σε draft',
            cancelReason: 'Λογος ακυρωσης (προαιρετικο)',
            confirmCancel: 'Επιβεβαιωση ακυρωσης',
            revisionReason: 'Λογος αναθεωρησης (προαιρετικο)',
            revisionPlaceholder: 'π.χ. Προσαρμογη τιμησης βασει σχολιων πελατη',
            confirmRevise: 'Επιβεβαιωση αναθεωρησης',
            backBtn: 'Πισω',
            details: 'Στοιχεια προσφορας',
            titleLabel: 'Τιτλος *',
            recipientNameLabel: 'Ονομα παραληπτη',
            recipientEmailLabel: 'Email παραληπτη *',
            currencyLabel: 'Νομισμα',
            priceAmountLabel: 'Ποσο τιμης',
            taxRateLabel: 'Φορος (%)',
            validUntilLabel: 'Ισχυει εως',
            descriptionLabel: 'Περιγραφη',
            editableHint: 'Οι DRAFT προσφορες μπορουν να επεξεργαστουν και να σταλουν.',
            viewOnly: 'Μονο προβολη.',
            saving: 'Αποθηκευση...',
            save: 'Αποθηκευση αλλαγων',
            lineItems: 'Γραμμες εργασιων',
            lineItemsHint: 'Προσθεσε tasks/deliverables σε αυτη την προσφορα.',
            addItem: 'Προσθηκη γραμμης',
            editItem: 'Επεξεργασια γραμμης',
            newItem: 'Νεα γραμμη',
            qtyLabel: 'Ποσοτητα',
            unitPriceLabel: 'Τιμη μοναδας',
            taxRateItemLabel: 'Φορος (%)',
            sortOrderLabel: 'Σειρα',
            saveItem: 'Αποθηκευση',
            cancel: 'Ακυρωση',
            noItems: 'Δεν υπαρχουν γραμμες ακομα.',
            submissionHistory: 'Ιστορικο υποβολων',
            subtotal: 'Μερικο συνολο:',
            tax: 'Φορος',
            total: 'Συνολο:',
            qtyHeader: 'Ποσ.',
            unitPriceHeader: 'Τιμη μοναδας',
            totalHeader: 'Συνολο',
            actionHeader: 'Ενεργεια',
            edit: 'Επεξεργασια',
            delete: 'Διαγραφη',
          }
        : {
            loading: 'Loading offer...',
            notFound: 'Offer not found.',
            pageTitle: 'Offer detail',
            preview: 'Preview public view',
            back: 'Back to offers',
            feedback: 'Client feedback:',
            actions: 'Actions',
            noActions: 'No further actions are available for this status.',
            sending: 'Sending...',
            send: 'Send to client',
            cancelOffer: 'Cancel offer',
            discardDraft: 'Discard draft',
            reviseToDraft: 'Revise to draft',
            cancelReason: 'Cancel reason (optional)',
            confirmCancel: 'Confirm cancel',
            revisionReason: 'Revision reason (optional)',
            revisionPlaceholder: 'e.g., Adjusted pricing based on client feedback',
            confirmRevise: 'Confirm revise',
            backBtn: 'Back',
            details: 'Offer details',
            titleLabel: 'Title *',
            recipientNameLabel: 'Recipient Name',
            recipientEmailLabel: 'Recipient Email *',
            currencyLabel: 'Currency',
            priceAmountLabel: 'Price amount',
            taxRateLabel: 'Tax rate (%)',
            validUntilLabel: 'Valid until',
            descriptionLabel: 'Description',
            editableHint: 'DRAFT offers can be edited and sent.',
            viewOnly: 'View-only mode.',
            saving: 'Saving...',
            save: 'Save changes',
            lineItems: 'Line Items',
            lineItemsHint: 'Add tasks/deliverables to this offer.',
            addItem: 'Add item',
            editItem: 'Edit line item',
            newItem: 'New line item',
            qtyLabel: 'Quantity',
            unitPriceLabel: 'Unit Price',
            taxRateItemLabel: 'Tax Rate (%)',
            sortOrderLabel: 'Sort Order',
            saveItem: 'Save',
            cancel: 'Cancel',
            noItems: 'No line items yet.',
            submissionHistory: 'Submission history',
            subtotal: 'Subtotal:',
            tax: 'Tax',
            total: 'Total:',
            qtyHeader: 'Qty',
            unitPriceHeader: 'Unit Price',
            totalHeader: 'Total',
            actionHeader: 'Action',
            edit: 'Edit',
            delete: 'Delete',
          },
    [locale],
  );

  const offerQuery = useQuery({
    queryKey: queryKeys.offers.detail(id),
    queryFn: () => offerApi.getById(id),
    enabled: Boolean(id),
  });

  const submissionsQuery = useQuery({
    queryKey: ['offer-submissions', id],
    queryFn: () => offerApi.getSubmissions(id),
    enabled: Boolean(id),
  });

  const baseFormState = useMemo<OfferFormState>(() => {
    const offer = offerQuery.data;
    return {
      ...defaultFormState,
      title: offer?.title ?? '',
      description: offer?.description || '',
      recipientName: offer?.recipientName || '',
      recipientEmail: offer?.recipientEmail ?? '',
      priceAmount: typeof offer?.priceAmount === 'number' ? String(offer.priceAmount) : '',
      taxRate: typeof offer?.taxRate === 'number' ? String(offer.taxRate) : '',
      currency: offer?.currency || 'EUR',
      validUntil: toIsoDateInput(offer?.validUntil),
    };
  }, [offerQuery.data]);

  const {
    state: formState,
    setField: handleFieldChange,
    resetDraft: resetFormDraft,
  } = useEntityDraftState<OfferFormState>(id, baseFormState);

  const refreshOfferData = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.detail(id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.root }),
      queryClient.invalidateQueries({ queryKey: ['offer-submissions', id] }),
    ]);
  }, [id, queryClient]);

  const updateMutation = useMutation({
    mutationFn: () =>
      offerApi.update(id, {
        title: formState.title,
        description: formState.description || undefined,
        recipientName: formState.recipientName || undefined,
        recipientEmail: formState.recipientEmail,
        priceAmount: formState.priceAmount ? Number(formState.priceAmount) : undefined,
        taxRate: formState.taxRate ? Number(formState.taxRate) : undefined,
        currency: formState.currency || undefined,
        validUntil: formState.validUntil ? new Date(formState.validUntil).toISOString() : undefined,
      }),
    onSuccess: async () => {
      clearError();
      resetFormDraft();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const sendMutation = useMutation({
    mutationFn: () => offerApi.send(id),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const reviseMutation = useMutation({
    mutationFn: () => offerApi.revise(id, reviseReason ? { reason: reviseReason } : undefined),
    onSuccess: async () => {
      clearError();
      setReviseReason('');
      setShowReviseReason(false);
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const cancelMutation = useMutation({
    mutationFn: () => offerApi.cancel(id, cancelReason ? { reason: cancelReason } : undefined),
    onSuccess: async () => {
      clearError();
      setCancelReason('');
      setShowCancelReason(false);
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const rejectStatusMutation = useMutation({
    mutationFn: () =>
      offerApi.changeStatus(id, { targetStatus: 'REJECTED', reason: 'Discarded before sending' }),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const createLineItemMutation = useMutation({
    mutationFn: (payload: CreateLineItemPayload) => offerApi.createLineItem(id, payload),
    onSuccess: async () => {
      clearError();
      setLineItemFormState(defaultLineItemFormState);
      setShowLineItemForm(false);
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const updateLineItemMutation = useMutation({
    mutationFn: (payload: UpdateLineItemPayload) =>
      offerApi.updateLineItem(id, editingLineItemId || '', payload),
    onSuccess: async () => {
      clearError();
      setLineItemFormState(defaultLineItemFormState);
      setEditingLineItemId(null);
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const deleteLineItemMutation = useMutation({
    mutationFn: (itemId: string) => offerApi.deleteLineItem(id, itemId),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const handleUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateMutation.mutateAsync();
    },
    [updateMutation],
  );

  const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('title', event.target.value);
  }, [handleFieldChange]);

  const handleRecipientNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('recipientName', event.target.value);
  }, [handleFieldChange]);

  const handleRecipientEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('recipientEmail', event.target.value);
  }, [handleFieldChange]);

  const handleCurrencyChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('currency', event.target.value.toUpperCase());
  }, [handleFieldChange]);

  const handlePriceAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('priceAmount', event.target.value);
  }, [handleFieldChange]);

  const handleTaxRateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('taxRate', event.target.value);
  }, [handleFieldChange]);

  const handleValidUntilChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('validUntil', event.target.value);
  }, [handleFieldChange]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    handleFieldChange('description', event.target.value);
  }, [handleFieldChange]);

  const handleSend = useCallback(() => {
    sendMutation.mutate();
  }, [sendMutation]);

  const handleLineItemFieldChange = useCallback((field: keyof LineItemFormState, value: string) => {
    setLineItemFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddLineItem = useCallback(() => {
    setEditingLineItemId(null);
    setLineItemFormState(defaultLineItemFormState);
    setShowLineItemForm(true);
  }, []);

  const handleEditLineItem = useCallback((item: OfferLineItemResponse) => {
    setEditingLineItemId(item.id);
    setLineItemFormState({
      description: item.description,
      quantity: String(item.quantity),
      unitPrice: String(item.unitPrice),
      taxRate: item.taxRate ? String(item.taxRate) : '',
      sortOrder: String(item.sortOrder),
    });
    setShowLineItemForm(true);
  }, []);

  const handleSaveLineItem = useCallback(() => {
    const payload: CreateLineItemPayload = {
      description: lineItemFormState.description,
      quantity: Number(lineItemFormState.quantity),
      unitPrice: Number(lineItemFormState.unitPrice),
      taxRate: lineItemFormState.taxRate ? Number(lineItemFormState.taxRate) : undefined,
      sortOrder: lineItemFormState.sortOrder ? Number(lineItemFormState.sortOrder) : undefined,
    };

    if (editingLineItemId) {
      updateLineItemMutation.mutate(payload as UpdateLineItemPayload);
    } else {
      createLineItemMutation.mutate(payload);
    }
  }, [lineItemFormState, editingLineItemId, createLineItemMutation, updateLineItemMutation]);

  const handleDeleteLineItem = useCallback((itemId: string) => {
    if (confirm('Are you sure you want to delete this line item?')) {
      deleteLineItemMutation.mutate(itemId);
    }
  }, [deleteLineItemMutation]);

  const handleCancel = useCallback(() => {
    setShowCancelReason(true);
  }, []);

  const handleRevise = useCallback(() => {
    setShowReviseReason(true);
  }, []);

  const handleConfirmRevise = useCallback(() => {
    reviseMutation.mutate();
  }, [reviseMutation]);

  const handleConfirmCancel = useCallback(() => {
    cancelMutation.mutate();
  }, [cancelMutation]);

  const handleRejectStatus = useCallback(() => {
    if (confirm(text.discardDraft + '?')) {
      rejectStatusMutation.mutate();
    }
  }, [rejectStatusMutation, text.discardDraft]);

  if (offerQuery.isLoading) {
    return <p className="text-sm text-gray-500">{text.loading}</p>;
  }

  if (!offerQuery.data) {
    return <p className="text-sm text-gray-500">{text.notFound}</p>;
  }

  const offer = offerQuery.data;
  const isDraft = offer.status === 'DRAFT';
  const isSent = offer.status === 'SENT';
  const isRejected = offer.status === 'REJECTED_BY_CLIENT';
  const hasAvailableActions = isDraft || isSent || isRejected;
  const isEditable = isDraft;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">{text.pageTitle}</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{offer.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={offer.status} />
            {offer.revisionNumber > 0 && (
              <span className="text-sm text-gray-600">Rev {offer.revisionNumber}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {offer.publicToken && (
            <Link
              to={`/offers/${offer.publicToken}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
            >
              {text.preview}
            </Link>
          )}
          <Link to="/admin/offers" className="text-sm font-medium text-gray-700 underline">
            {text.back}
          </Link>
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
      )}

      {offer.rejectionNote && (
        <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
          <p className="text-sm font-semibold text-orange-900">{text.feedback}</p>
          <p className="text-sm text-orange-800 mt-2">{offer.rejectionNote}</p>
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-6" id="offer-actions">
        <h3 className="text-lg font-semibold text-gray-900">{text.actions}</h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {isDraft && (
            <>
              <button
                onClick={handleSend}
                disabled={sendMutation.isPending}
                className="rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
              >
                {sendMutation.isPending ? text.sending : `↑ ${text.send}`}
              </button>

              <button
                onClick={handleCancel}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {text.cancelOffer}
              </button>

              <button
                onClick={handleRejectStatus}
                className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100"
              >
                {text.discardDraft}
              </button>
            </>
          )}

          {isSent && (
            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {text.cancelOffer}
            </button>
          )}

          {isRejected && (
            <button
              onClick={handleRevise}
              className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              {`↻ ${text.reviseToDraft}`}
            </button>
          )}

          {!hasAvailableActions && (
            <p className="text-sm text-gray-500">{text.noActions}</p>
          )}
        </div>

        {showCancelReason && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.cancelReason}</label>
            <Textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              className="w-full mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleConfirmCancel}
                disabled={cancelMutation.isPending}
                className="rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {text.confirmCancel}
              </button>
              <button
                onClick={() => setShowCancelReason(false)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {text.backBtn}
              </button>
            </div>
          </div>
        )}

        {showReviseReason && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.revisionReason}</label>
            <Textarea
              value={reviseReason}
              onChange={(e) => setReviseReason(e.target.value)}
              placeholder={text.revisionPlaceholder}
              rows={3}
              className="w-full mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleConfirmRevise}
                disabled={reviseMutation.isPending}
                className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {text.confirmRevise}
              </button>
              <button
                onClick={() => setShowReviseReason(false)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {text.backBtn}
              </button>
            </div>
          </div>
        )}
      </section>

      <DetailContentTabs
        detailsLabel={text.details}
        entityType="OFFER"
        entityId={offer.id}
        detailsContent={(
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">{text.details}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {isEditable ? text.editableHint : text.viewOnly}
              </p>

              <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
                <Input label={text.titleLabel} value={formState.title} onChange={handleTitleChange} disabled={!isEditable} required />
                <Input label={text.recipientNameLabel} value={formState.recipientName} onChange={handleRecipientNameChange} disabled={!isEditable} />
                <Input label={text.recipientEmailLabel} type="email" value={formState.recipientEmail} onChange={handleRecipientEmailChange} disabled={!isEditable} required />
                <Input label={text.currencyLabel} value={formState.currency} onChange={handleCurrencyChange} disabled={!isEditable} maxLength={5} />
                <Input label={text.priceAmountLabel} type="number" step="0.01" value={formState.priceAmount} onChange={handlePriceAmountChange} disabled={!isEditable} />
                <Input label={text.taxRateLabel} type="number" step="0.01" value={formState.taxRate} onChange={handleTaxRateChange} disabled={!isEditable} />
                <Input label={text.validUntilLabel} type="date" value={formState.validUntil} onChange={handleValidUntilChange} disabled={!isEditable} />
                <div className="md:col-span-2">
                  <Textarea label={text.descriptionLabel} value={formState.description} onChange={handleDescriptionChange} disabled={!isEditable} rows={4} />
                </div>
                {isEditable && (
                  <div className="md:col-span-2 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
                    >
                      {updateMutation.isPending ? text.saving : text.save}
                    </button>
                  </div>
                )}
              </form>
            </section>

            {isEditable && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{text.lineItems}</h3>
                    <p className="mt-1 text-sm text-gray-600">{text.lineItemsHint}</p>
                  </div>
                  <button
                    onClick={handleAddLineItem}
                    className="rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700"
                  >
                    + {text.addItem}
                  </button>
                </div>

                {showLineItemForm && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">{editingLineItemId ? text.editItem : text.newItem}</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input label={text.descriptionLabel} value={lineItemFormState.description} onChange={(e) => handleLineItemFieldChange('description', e.target.value)} required />
                      <Input label={text.qtyLabel} type="number" step="0.01" value={lineItemFormState.quantity} onChange={(e) => handleLineItemFieldChange('quantity', e.target.value)} required />
                      <Input label={text.unitPriceLabel} type="number" step="0.01" value={lineItemFormState.unitPrice} onChange={(e) => handleLineItemFieldChange('unitPrice', e.target.value)} required />
                      <Input label={text.taxRateItemLabel} type="number" step="0.01" value={lineItemFormState.taxRate} onChange={(e) => handleLineItemFieldChange('taxRate', e.target.value)} />
                      <Input label={text.sortOrderLabel} type="number" value={lineItemFormState.sortOrder} onChange={(e) => handleLineItemFieldChange('sortOrder', e.target.value)} />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSaveLineItem}
                        disabled={createLineItemMutation.isPending || updateLineItemMutation.isPending}
                        className="rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {createLineItemMutation.isPending || updateLineItemMutation.isPending ? text.saving : text.saveItem}
                      </button>
                      <button
                        onClick={() => {
                          setShowLineItemForm(false);
                          setLineItemFormState(defaultLineItemFormState);
                        }}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {text.cancel}
                      </button>
                    </div>
                  </div>
                )}

                {offer.lineItems.length === 0 ? (
                  <p className="text-sm text-gray-500">{text.noItems}</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">{text.descriptionLabel}</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">{text.qtyHeader}</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">{text.unitPriceHeader}</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">{text.totalHeader}</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">{text.actionHeader}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {offer.lineItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">{item.description}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{item.unitPrice.toFixed(2)} {offer.currency}</td>
                            <td className="px-4 py-3 text-right font-medium text-gray-900">{item.lineTotal.toFixed(2)} {offer.currency}</td>
                            <td className="px-4 py-3 text-center">
                              <button onClick={() => handleEditLineItem(item)} className="text-sm text-blue-600 hover:text-blue-800 mr-2">{text.edit}</button>
                              <button onClick={() => handleDeleteLineItem(item.id)} disabled={deleteLineItemMutation.isPending} className="text-sm text-red-600 hover:text-red-800">{text.delete}</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {offer.lineItems.length > 0 && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 max-w-xs ml-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{text.subtotal}</span>
                      <span className="font-medium">{(offer.subtotalAmount || 0).toFixed(2)} {offer.currency}</span>
                    </div>
                    {typeof offer.taxAmount === 'number' && offer.taxAmount > 0 && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">{text.tax} ({offer.taxRate}%):</span>
                        <span className="font-medium">{offer.taxAmount.toFixed(2)} {offer.currency}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-300">
                      <span>{text.total}</span>
                      <span>{(offer.totalAmount || 0).toFixed(2)} {offer.currency}</span>
                    </div>
                  </div>
                )}
              </section>
            )}

            {submissionsQuery.data && submissionsQuery.data.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{text.submissionHistory}</h3>
                <div className="space-y-3">
                  {submissionsQuery.data.map((submission) => (
                    <div key={submission.id} className="flex gap-4 py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                          <span className="text-xs font-semibold text-gray-700">{submission.revisionNumber}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900">{submission.action}</p>
                        {submission.note && <p className="text-sm text-gray-600 mt-1">{submission.note}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(submission.createdAt || '').toLocaleDateString()} {locale === 'el' ? 'στις' : 'at'}{' '}
                          {new Date(submission.createdAt || '').toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      />
    </div>
  );
};


