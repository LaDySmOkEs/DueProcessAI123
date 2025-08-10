
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocumentCollection, AnalyzedDocument, LegalCase } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";
import { 
  FolderOpen, 
  FileText, 
  Trash2, 
  Eye, 
  Download, 
  Calendar,
  Shield,
  Search,
  Plus,
  Loader2,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';

export default function DocumentManager() {
    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initial page loading state for cases
    const [isSubLoading, setIsSubLoading] = useState(false); // Loading state for collections/documents
    const [filterTag, setFilterTag] = useState(''); // New state for tag filtering
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    // Effect to load initial data (cases)
    useEffect(() => {
        loadInitialData();
    }, []);

    // Effect to load collections when selectedCase changes
    useEffect(() => {
        if (selectedCase) {
            loadCollectionsForCase(selectedCase.id);
        } else {
            setCollections([]);
            setSelectedCollection(null);
        }
    }, [selectedCase]);

    // Effect to load documents when selectedCollection changes
    useEffect(() => {
        if (selectedCollection) {
            loadDocuments(selectedCollection.id);
        } else {
            setDocuments([]);
        }
    }, [selectedCollection]);

    // Effect to filter documents whenever the raw documents, filter tag, or search query changes
    useEffect(() => {
        filterDocuments();
    }, [documents, filterTag, searchQuery]);

    const loadInitialData = async () => {
        setIsLoading(true);
        try {
            const casesData = await LegalCase.list("-created_date");
            setCases(casesData);
            if (casesData.length > 0) {
                // Automatically select the first case to load its collections
                setSelectedCase(casesData[0]);
            }
        } catch (error) {
            console.error("Error loading initial data (cases):", error);
            toast({
                title: "Error",
                description: "Failed to load legal cases.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const loadCollectionsForCase = async (caseId) => {
        if (!caseId) {
            setCollections([]);
            setSelectedCollection(null);
            return;
        }
        setIsSubLoading(true);
        setCollections([]); // Clear previous collections
        setSelectedCollection(null); // Clear selected collection
        try {
            const collectionsData = await DocumentCollection.filter({ case_id: caseId }, "-created_date");
            setCollections(collectionsData);
            if (collectionsData.length > 0) {
                // Automatically select the first collection
                setSelectedCollection(collectionsData[0]);
            }
        } catch (error) {
            console.error("Error loading collections:", error);
            toast({
                title: "Error",
                description: `Failed to load collections for case. ${error.message || ''}`,
                variant: "destructive",
            });
        } finally {
            setIsSubLoading(false);
        }
    };

    const loadDocuments = async (collectionId) => {
        if (!collectionId) {
            setDocuments([]); // Ensure documents are cleared if no collectionId
            return;
        }
        setIsSubLoading(true);
        setDocuments([]); // Clear previous documents while loading new ones
        try {
            const documentsData = await AnalyzedDocument.filter({ collection_id: collectionId }, "-created_date");
            setDocuments(documentsData);
        } catch (error) {
            console.error("Error loading documents:", error);
            toast({
                title: "Error",
                description: `Failed to load documents for collection. ${error.message || ''}`,
                variant: "destructive",
            });
        } finally {
            setIsSubLoading(false);
        }
    };

    const filterDocuments = () => {
        let filtered = documents;

        // Filter by search query (document name, summary, notes)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(doc => 
                doc.document_name.toLowerCase().includes(query) ||
                doc.analysis_summary?.toLowerCase().includes(query) ||
                doc.notes?.toLowerCase().includes(query)
            );
        }
        
        // Filter by tag
        if (filterTag.trim()) {
            const tagQuery = filterTag.toLowerCase();
            filtered = filtered.filter(doc => 
                doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(tagQuery))
            );
        }

        setFilteredDocuments(filtered);
    };

    const deleteDocument = async (documentId, documentName) => {
        if (!confirm(`Are you sure you want to delete "${documentName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await AnalyzedDocument.delete(documentId);
            
            // Update collection document count in state and backend
            if (selectedCollection) {
                const updatedCount = Math.max((selectedCollection.document_count || 1) - 1, 0);
                await DocumentCollection.update(selectedCollection.id, {
                    document_count: updatedCount
                });
                // Update the collection list and selected collection state
                setCollections(prevCollections => 
                    prevCollections.map(c => 
                        c.id === selectedCollection.id ? { ...c, document_count: updatedCount } : c
                    )
                );
                setSelectedCollection(prevSelected => ({ ...prevSelected, document_count: updatedCount }));
            }
            
            await loadDocuments(selectedCollection?.id); // Reload documents for the current collection
            
            toast({
                title: "Document Deleted",
                description: `"${documentName}" has been permanently deleted.`,
            });
        } catch (error) {
            console.error("Error deleting document:", error);
            toast({
                title: "Delete Failed",
                description: "Failed to delete document. Please try again.",
                variant: "destructive",
            });
        }
    };

    const viewDocument = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const downloadDocument = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getDocumentTypeColor = (type) => {
        const colors = {
            police_report: "bg-red-100 text-red-800",
 
